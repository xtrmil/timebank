package se.experis.timebank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.experis.timebank.models.VacationRequest;
import se.experis.timebank.repositories.VacationRequestRepository;

@Service
public class VacationRequestService {

    public static final int maxPeriod = 25;

    @Autowired
    private VacationRequestRepository vacationRequestRepository;

    public ResponseEntity<CommonResponse> createVacationRequest(VacationRequest vacationRequest){
        CommonResponse cr = new CommonResponse();
        vacationRequestRepository.save(vacationRequest);
        cr.data = vacationRequest;
        cr.msg = "User with id:" + vacationRequest.getId() + " created";
        cr.status = HttpStatus.CREATED;

        return new ResponseEntity<>(cr,cr.status);
    }

    public ResponseEntity<CommonResponse> getVacationRequestById(Long id){
        CommonResponse cr = new CommonResponse();

        try{
            cr.data = vacationRequestRepository.findById(id).get();
            cr.msg = "VacationRequest with id:" + id + " was found.";
            cr.status = HttpStatus.OK;

        } catch(Exception e) {
            cr.data = e.getMessage();
            cr.msg = " Currently unable to get request";
            cr.status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> getVacationRequestByUserId(Long id){
        CommonResponse cr = new CommonResponse();

        try{
            cr.data = vacationRequestRepository.findAllByUserId(id);
            cr.msg = "VacationRequest with id:" + id + " was found.";
            cr.status = HttpStatus.OK;

        } catch(Exception e) {
            cr.data = e.getMessage();
            cr.msg = " Currently unable to get request";
            cr.status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(cr, cr.status);
    }
}
