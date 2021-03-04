package se.experis.timebank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<CommonResponse> createVacationRequest(@RequestBody VacationRequest vacationRequest){
        return vacationRequestService.createVacationRequest(vacationRequest);
    }

    @GetMapping("/all")
    public ResponseEntity<CommonResponse> getAllVacationRequests(@AuthenticationPrincipal UserCredentials userCredentials){
        return vacationRequestService.getAllVacationRequests(userCredentials);
    }

    @GetMapping("/user")
    public ResponseEntity<CommonResponse> getAllVacationRequestByUserId(@AuthenticationPrincipal UserCredentials userCredentials)
    {
        return vacationRequestService.getAllVacationRequestByUserId(userCredentials);
    }

    @PutMapping("/{requestId}")
    public ResponseEntity<CommonResponse> updateVacationRequest(@AuthenticationPrincipal UserCredentials userCredentials,
                                                                @PathVariable Long requestId, @RequestBody VacationRequest vacationRequest){
        return vacationRequestService.updateVacationRequest(userCredentials,requestId,vacationRequest);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{requestId}")
    public ResponseEntity<CommonResponse> deleteVacationRequest(@PathVariable Long requestId){

        return vacationRequestService.deleteVacationRequestById(requestId);
    }
    @GetMapping("/test")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<CommonResponse> test(@AuthenticationPrincipal UserCredentials userCredentials){
        CommonResponse cr = new CommonResponse();
        cr.data = userCredentials.getAuthorities();
        return new ResponseEntity<>(cr, HttpStatus.OK);

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
