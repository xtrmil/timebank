package se.experis.timebank.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.experis.timebank.models.SingleVacationLimit;
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all/export")
    public ResponseEntity<byte[]> exportAllVacationRequestsToJSON(){
        return vacationRequestService.exportAllVacationRequestsToJSON();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping(value="/import", consumes="multipart/form-data")
    public ResponseEntity<CommonResponse> importVacationRequestsFromJSON(@RequestParam("file") MultipartFile requests){
        return vacationRequestService.importVacationRequestsFromJSON(requests);
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/get/singlevacationlimit/")
    public ResponseEntity<CommonResponse> getSingleVacationLimit(){
        return vacationRequestService.getSingleVacationLimit();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update/singlevacationlimit/")
    public ResponseEntity<CommonResponse> updateSingleVacationLimit(@RequestBody SingleVacationLimit limit){
        return vacationRequestService.updateSingleVacationLimit(limit.getLength());
    }

    @GetMapping("/{requestId}")
   public ResponseEntity<CommonResponse> getVacationRequestById(@PathVariable Long requestId) {    // behövs?
       return vacationRequestService.getVacationRequestById(requestId);
   }
}
