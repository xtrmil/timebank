package se.experis.timebank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.experis.timebank.models.RequestStatus;
import se.experis.timebank.models.User;
import se.experis.timebank.models.VacationRequest;
import se.experis.timebank.repositories.UserRepository;
import se.experis.timebank.repositories.VacationRequestRepository;
import se.experis.timebank.utils.Validations;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class VacationRequestService {

    public static final int maxPeriod = 25;

    @Autowired
    private VacationRequestRepository vacationRequestRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Se över variabelnamn
     */
    private Validations validation = new Validations();

    public ResponseEntity<CommonResponse> createVacationRequest(VacationRequest vacationRequest) {
        CommonResponse cr = new CommonResponse();
        long requestedLength = validation.validatePeriodLength(vacationRequest.getStartDate(), vacationRequest.getEndDate());

        if (requestedLength >= 0 && requestedLength <= maxPeriod) {
            User user = userRepository.findById(vacationRequest.getUser().getId()).get();
            vacationRequest.setUser(user);
            vacationRequestRepository.save(vacationRequest);
            cr.data = vacationRequest;
            cr.msg = "vacationRequest created successfully";
            cr.status = HttpStatus.CREATED;
        } else {
            if (requestedLength > 0) {
                cr.msg = "VacationRequest length (" + requestedLength + ") exceeds max length (" + maxPeriod + ")";
            } else {
                cr.msg = "VacationRequest length must be minimum 1 day";
            }
            cr.status = HttpStatus.BAD_REQUEST;
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

    public ResponseEntity<CommonResponse> getAllVacationRequestByUserId(Long userId) {
        CommonResponse cr = new CommonResponse();

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            cr.data = vacationRequestRepository.findAllByUserId(userId);
            cr.msg = "VacationRequest with id:" + userId + " was found.";
            cr.status = HttpStatus.OK;
        } else {
            cr.msg = " Currently unable to get request";
            cr.status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> getAllVacationRequests(){
        CommonResponse cr = new CommonResponse();
        Set<VacationRequest> requests;
        boolean isAdmin = false;
        long userId = 1;
        if(isAdmin){

            requests = new HashSet<>(vacationRequestRepository.findAllByStatusNot(RequestStatus.DENIED));
        }else{
            requests = new HashSet<>(vacationRequestRepository.findAllByStatus(RequestStatus.APPROVED));
            requests.addAll(new HashSet<>(vacationRequestRepository.findAllByUserId(userId)));
        }
        cr.data = requests;
        cr.status = HttpStatus.OK;
        return new ResponseEntity<>(cr,cr.status);
    }



    public ResponseEntity<CommonResponse> updateVacationRequest(Long requestId, VacationRequest newVacationRequest) {
        CommonResponse cr = new CommonResponse();

        Optional<VacationRequest> optionalUser = vacationRequestRepository.findById(requestId);
        if (optionalUser.isPresent()) {

            VacationRequest request = optionalUser.get();
            //if admin
            if (newVacationRequest.getStatus() != null) {
                request.setStatus(newVacationRequest.getStatus());
            }

            // if not moderated, and authorized
            if (newVacationRequest.getStartDate() != null) {
                request.setStartDate(newVacationRequest.getStartDate());
            }

            if (newVacationRequest.getEndDate() != null) {
                request.setEndDate(newVacationRequest.getEndDate());
            }

            if (newVacationRequest.getTitle() != null) {
                request.setTitle(newVacationRequest.getTitle());
            }
            cr.data = vacationRequestRepository.save(newVacationRequest);
            cr.msg = "VacationRequest with id " + requestId + " was updated";
            cr.status = HttpStatus.OK;
        } else {
            cr.msg = "VacationRequest with id " + requestId + " not found";
            cr.status = HttpStatus.NOT_FOUND;
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

}

