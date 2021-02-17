package se.experis.timebank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.experis.timebank.models.VacationRequest;
import se.experis.timebank.services.CommonResponse;
import se.experis.timebank.services.VacationRequestService;

@RestController
@RequestMapping("/api/v1/request")

public class VacationRequestController {

    @Autowired
    VacationRequestService vacationRequestService;

    @PostMapping("")
    public ResponseEntity<CommonResponse> createVacationRequest(@RequestBody VacationRequest vacationRequest){
        return vacationRequestService.createVacationRequest(vacationRequest);
    }

    @GetMapping("")
    public ResponseEntity<CommonResponse> getVacationRequest(){
        return null;
    }

    @GetMapping("/{requestId}")
    public ResponseEntity<CommonResponse> getVacationRequestById(){
        return null;
    }

    @PatchMapping("/{requestId}")
    public ResponseEntity<CommonResponse> updateVacationRequest(){
        return null;
    }

    @DeleteMapping("/{requestId}")
    public ResponseEntity<CommonResponse> deleteVacationRequest(){
        return null;
    }
}
