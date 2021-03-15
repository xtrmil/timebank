package se.experis.timebank.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import se.experis.timebank.models.RequestStatus;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.models.VacationRequest;
import se.experis.timebank.services.CommonResponse;
import se.experis.timebank.services.VacationRequestService;

@RestController
@RequestMapping("/api/v1/request")

public class VacationRequestController {

    @Autowired
    VacationRequestService vacationRequestService;

    @PostMapping("")
    public ResponseEntity<CommonResponse> createVacationRequest(@AuthenticationPrincipal UserCredentials userCredentials, @RequestBody VacationRequest vacationRequest){
        return vacationRequestService.createVacationRequest(userCredentials,vacationRequest);
    }

    @GetMapping("/all")
    public ResponseEntity<CommonResponse> getAllVacationRequests(@AuthenticationPrincipal UserCredentials userCredentials){
        return vacationRequestService.getAllVacationRequests(userCredentials);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all/admin")
    public ResponseEntity<CommonResponse> getAllVacationRequestsAdminview(){
        return vacationRequestService.getAllVacationRequestsAdminview();
    }


    @GetMapping("/user")
    public ResponseEntity<CommonResponse> getAllVacationRequestByUserToken(@AuthenticationPrincipal UserCredentials userCredentials)
    {
        return vacationRequestService.getAllVacationRequestsByUserToken(userCredentials);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<CommonResponse> getAllVacationRequestByUserId(@AuthenticationPrincipal UserCredentials userCredentials, @PathVariable Long userId){
        return vacationRequestService.getAllVacationRequestsByUserId(userCredentials, userId);
    }

    @PutMapping("update/{requestId}")
    public ResponseEntity<CommonResponse> updateVacationRequest(@AuthenticationPrincipal UserCredentials userCredentials,
                                                                @PathVariable Long requestId, @RequestBody VacationRequest vacationRequest){
        return vacationRequestService.updateVacationRequest(userCredentials,requestId,vacationRequest);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("update/status/{requestId}")
    public ResponseEntity<CommonResponse> updateVacationRequestStatus(@AuthenticationPrincipal UserCredentials userCredentials, @PathVariable Long requestId, @RequestBody ObjectNode status){
        return vacationRequestService.updateVacationRequestStatus(userCredentials,requestId, status.get("status").asText());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{requestId}")
    public ResponseEntity<CommonResponse> deleteVacationRequest(@PathVariable Long requestId){

        return vacationRequestService.deleteVacationRequestById(requestId);
    }



//    @GetMapping("")
//    public ResponseEntity<CommonResponse> getVacationRequest(){ // token
//        return null;
//    }

//    @GetMapping("/{requestId}")
//    public ResponseEntity<CommonResponse> getVacationRequestById(@PathVariable Long requestId) {    // behövs?
//        return vacationRequestService.getVacationRequestById(requestId);
//    }
}
