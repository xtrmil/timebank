package se.experis.timebank.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.experis.timebank.services.CommonResponse;

@RestController
@RequestMapping("/api/v1/request")

public class VacationRequestController {

    @PostMapping("")
    public ResponseEntity<CommonResponse> createVacationRequest(){
        return null;
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
