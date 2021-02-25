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
    public ResponseEntity<CommonResponse> getVacationRequest(){ // token
        return null;
    }
    @GetMapping("/all")
    public ResponseEntity<CommonResponse> getAllVacationRequests(){
        return vacationRequestService.getAllVacationRequests();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<CommonResponse> getAllVacationRequestByUserId(@PathVariable Long userId)   //token, check admin
    {
        return vacationRequestService.getAllVacationRequestByUserId(userId);
    }

    @GetMapping("/{requestId}")
    public ResponseEntity<CommonResponse> getVacationRequestById(@PathVariable Long requestId) {
        return vacationRequestService.getVacationRequestById(requestId);
    }

    @PutMapping("/{requestId}")
    public ResponseEntity<CommonResponse> updateVacationRequest(@PathVariable Long requestId, @RequestBody VacationRequest vacationRequest){   //token,check admin
        return vacationRequestService.updateVacationRequest(requestId,vacationRequest);
    }

    @DeleteMapping("/{requestId}")
    public ResponseEntity<CommonResponse> deleteVacationRequest(@PathVariable Long requestId){  //token

        return vacationRequestService.deleteVacationRequestById(requestId);
    }
}
