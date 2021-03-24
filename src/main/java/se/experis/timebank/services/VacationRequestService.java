package se.experis.timebank.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.threeten.extra.LocalDateRange;
import se.experis.timebank.models.*;
import se.experis.timebank.repositories.IneligibleRepository;
import se.experis.timebank.repositories.SingleVacationLengthRepository;
import se.experis.timebank.repositories.UserRepository;
import se.experis.timebank.repositories.VacationRequestRepository;
import se.experis.timebank.utils.JsonExporter;
import se.experis.timebank.utils.Validations;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.apache.commons.io.IOUtils;

@Service
public class VacationRequestService {

    public static final int maxPeriod = 20;
    public static final int totalVacationDays = 25;

    @Autowired
    private VacationRequestRepository vacationRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IneligibleRepository ineligibleRepository;

    @Autowired
    private SingleVacationLengthRepository singleVacationLengthRepository;

    @Autowired
    JsonExporter jsonExporter;

    @Autowired
    ObjectMapper objectMapper;

    /**
     * Se över variabelnamn
     */
    private Validations validation = new Validations();

    public ResponseEntity<CommonResponse> createVacationRequest(UserCredentials userCredentials, VacationRequest vacationRequest) {
        CommonResponse cr = new CommonResponse();

        if (!overlapsIneligblePeriod(vacationRequest)) {
            long requestedLength = validation.validatePeriodLength(vacationRequest.getStartDate(), vacationRequest.getEndDate());
            if (requestedLength >= 0 && requestedLength <= userCredentials.getCurrentVacationDays()) {

                Optional<User> optionalUser = userRepository.findById(userCredentials.getId());
                if (optionalUser.isPresent()) {
                    User user = optionalUser.get();
                    vacationRequest.setUser(user);
                    vacationRequestRepository.save(vacationRequest);
                    cr.data = vacationRequest;
                    cr.msg = "vacationRequest created successfully";
                    cr.status = HttpStatus.CREATED;
                } else {
                    cr.msg = "User not found";
                    cr.status = HttpStatus.NOT_FOUND;
                }

            } else {
                if (requestedLength > 0) {
                    cr.msg = "VacationRequest length (" + requestedLength + ") exceeds available days: (" + userCredentials.getCurrentVacationDays() + ")";
                } else {
                    cr.msg = "VacationRequest length must be minimum 1 day";
                }
                cr.status = HttpStatus.BAD_REQUEST;
            }
        } else {
            cr.status = HttpStatus.BAD_REQUEST;
            cr.msg = "Requested period overlaps ineligible";
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> getVacationRequestById(Long id) {
        CommonResponse cr = new CommonResponse();

        Optional<VacationRequest> optionalVacationRequest = vacationRequestRepository.findById(id);

        if (optionalVacationRequest.isPresent()) {
            cr.data = optionalVacationRequest.get();
            cr.msg = "VacationRequest with id:" + id + " was found.";
            cr.status = HttpStatus.OK;
        } else {
            cr.msg = " Currently unable to get request";
            cr.status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> getAllVacationRequestsByUserToken(UserCredentials userCredentials) {
        CommonResponse cr = new CommonResponse();

        Optional<User> optionalUser = userRepository.findById(userCredentials.getId());

        if (optionalUser.isPresent()) {
            cr.data = vacationRequestRepository.findAllByUserIdOrderByStartDateAsc(optionalUser.get().getId());
            cr.msg = "VacationRequest with id:" + optionalUser.get().getId() + " was found.";
            cr.status = HttpStatus.OK;
        } else {
            cr.msg = " Currently unable to get request";
            cr.status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> getAllVacationRequestsByUserId(UserCredentials userCredentials, Long userId) {
        CommonResponse cr = new CommonResponse();

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            if (userCredentials.isAdmin()) {
                cr.data = vacationRequestRepository.findAllByUserId(userId);
            } else {
                cr.data = vacationRequestRepository.findAllByUserIdAndStatusOrderByStartDateAsc(optionalUser.get().getId(), RequestStatus.APPROVED);
            }
            cr.msg = "VacationRequest with id:" + optionalUser.get().getId() + " was found.";
            cr.status = HttpStatus.OK;
        } else {
            cr.msg = " Currently unable to get request";
            cr.status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(cr, cr.status);

    }

    public ResponseEntity<CommonResponse> getAllVacationRequests(UserCredentials userCredentials) {
        CommonResponse cr = new CommonResponse();
        Set<VacationRequest> requests;

        if (userCredentials.isAdmin()) {
            requests = new HashSet<>(vacationRequestRepository.findAllByStatusNot(RequestStatus.DENIED));
        } else {
            requests = new HashSet<>(vacationRequestRepository.findAllByStatus(RequestStatus.APPROVED));
        }
        requests.addAll(new HashSet<>(vacationRequestRepository.findAllByUserId(userCredentials.getId())));
        cr.data = requests;
        cr.status = HttpStatus.OK;
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> getAllVacationRequestsAdminview() {
        CommonResponse cr = new CommonResponse();
        cr.data = vacationRequestRepository.findAll();
        cr.status = HttpStatus.OK;


        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> importVacationRequestsFromJSON(MultipartFile requests) {
        CommonResponse cr = new CommonResponse();
        try {
            ByteArrayInputStream stream = new ByteArrayInputStream(requests.getBytes());
            String input = IOUtils.toString(stream, "UTF-8");
            if (input != null || input != "") {
                List<VacationRequest> requestList = objectMapper.readValue(input, new TypeReference<>() {});
                requestList.forEach(request -> {
                    vacationRequestRepository.save(request);
                    System.out.println(request.getTitle() + " added");
                });
                cr.status = HttpStatus.OK;
                cr.msg = "Vacation requests successfully imported";
            }
            cr.status = HttpStatus.BAD_REQUEST;
            cr.msg = "File not valid for import";

        } catch (IOException e) {

        }

        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<byte[]> exportAllVacationRequestsToJSON() {
        byte[] customerJsonBytes = jsonExporter.export(vacationRequestRepository.findAll()).getBytes();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION)
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(customerJsonBytes.length)
                .body(customerJsonBytes);
    }

    public ResponseEntity<CommonResponse> updateVacationRequest(UserCredentials userCredentials, Long
            requestId, VacationRequest newVacationRequest) {
        CommonResponse cr = new CommonResponse();
        Optional<VacationRequest> optionalRequest = vacationRequestRepository.findById(requestId);

        if (optionalRequest.isPresent()) {
            VacationRequest request = optionalRequest.get();

            if (userCredentials.isAdmin() || userCredentials.getId() == request.getUser().getId()) {

                if (newVacationRequest.getStartDate() != null) {
                    request.setStartDate(newVacationRequest.getStartDate());
                }

                if (newVacationRequest.getEndDate() != null) {
                    request.setEndDate(newVacationRequest.getEndDate());
                }

                if (newVacationRequest.getTitle() != null) {
                    request.setTitle(newVacationRequest.getTitle());
                }
                if (newVacationRequest.getDescription().length() > 0) {
                    request.setDescription(newVacationRequest.getDescription());
                }
                Optional<User> admin = userRepository.findById(userCredentials.getId());
                request.setAdmin(admin.get());
                cr.data = vacationRequestRepository.save(request);
                cr.msg = "VacationRequest with id " + requestId + " was updated";
                cr.status = HttpStatus.OK;
            } else {
                cr.msg = "Unauthorized operation";
                cr.status = HttpStatus.UNAUTHORIZED;
            }
        } else {
            cr.msg = "VacationRequest with id " + requestId + " not found";
            cr.status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> updateVacationRequestStatus(UserCredentials userCredentials, Long
            requestId, String status) {
        CommonResponse cr = new CommonResponse();
        Optional<VacationRequest> optionalRequest = vacationRequestRepository.findById(requestId);

        if (optionalRequest.isPresent()) {
            if (optionalRequest.get().getStatus() != RequestStatus.APPROVED) {
                VacationRequest request = optionalRequest.get();
                RequestStatus updatedStatus = RequestStatus.valueOf(status);
                request.setStatus(updatedStatus);
                if (updatedStatus == RequestStatus.APPROVED) {
                    long vacationLength = validation.validatePeriodLength(request.getStartDate(), request.getEndDate());
                    User user = optionalRequest.get().getUser();
                    optionalRequest.get().getUser().setCurrentVacationDays((int) (user.getCurrentVacationDays() - vacationLength));
                    userRepository.save(user);
                }
                Optional<User> admin = userRepository.findById(userCredentials.getId());
                request.setAdmin(admin.get());

                cr.status = HttpStatus.OK;
                cr.msg = "Request status updated to " + status;
                vacationRequestRepository.save(request);
            } else {
                cr.status = HttpStatus.BAD_REQUEST;
                cr.msg = "Cannot change status on an allready approved vacation request";
            }
        } else {
            cr.status = HttpStatus.NOT_FOUND;
            cr.msg = "Request not found";
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> deleteVacationRequestById(Long requestId) {
        CommonResponse cr = new CommonResponse();
        Optional<VacationRequest> optionalRequest = vacationRequestRepository.findById(requestId);

        if (optionalRequest.isPresent()) {
            vacationRequestRepository.deleteById(requestId);
            cr.status = HttpStatus.OK;
            cr.msg = "Request with id: " + requestId + " successfully deleted";
        } else {
            cr.status = HttpStatus.NOT_FOUND;
            cr.msg = "Request with id: " + requestId + " not found";
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> getSingleVacationLimit(){
        CommonResponse cr = new CommonResponse();
        List<SingleVacationLimit> limit = singleVacationLengthRepository.findAll();

            if (limit.size() > 0) {
                cr.data = limit.get(0);
                cr.msg = "current length limit is: " + limit.get(0).getLength();
                cr.status = HttpStatus.OK;
            } else {
                SingleVacationLimit singleVacationLimit = new SingleVacationLimit();
                singleVacationLengthRepository.save(singleVacationLimit);

                cr.data = singleVacationLimit;
                cr.msg = "current length limit is: " + singleVacationLimit;
                cr.status = HttpStatus.BAD_REQUEST;
            }

        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> updateSingleVacationLimit(int length){
        CommonResponse cr = new CommonResponse();
        List<SingleVacationLimit> limit = singleVacationLengthRepository.findAll();
        if(limit.size() > 0 ){

            SingleVacationLimit singleVacationLimit = limit.get(0);
            singleVacationLimit.setLength(length);
            singleVacationLengthRepository.save(singleVacationLimit);

            cr.data = singleVacationLimit;
            cr.msg = "new length limit for a single vacation set to: "+singleVacationLimit.getLength();
            cr.status = HttpStatus.OK;
        }else{
            SingleVacationLimit singleVacationLimit = new SingleVacationLimit();
            singleVacationLimit.setLength(length);
            singleVacationLengthRepository.save(singleVacationLimit);
            cr.msg = "not allowed";
            cr.status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(cr, cr.status);
    }
    private boolean overlapsIneligblePeriod(VacationRequest vacationRequest) {
        List<IneligiblePeriod> ineligiblePeriods = ineligibleRepository.findAll();
        LocalDateRange requestPeriod = LocalDateRange.ofClosed(vacationRequest.getStartDate(), vacationRequest.getEndDate());

        for (IneligiblePeriod period : ineligiblePeriods) {
            LocalDateRange ineligibleperiod = LocalDateRange.ofClosed(period.getStartDate(), period.getEndDate());
            if (ineligibleperiod.overlaps(requestPeriod)) {
                return true;
            }
        }
        return false;
    }

}

