package se.experis.timebank.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.experis.timebank.models.EligibilityPeriod;
import se.experis.timebank.services.CommonResponse;

@RestController
@RequestMapping("/api/v1/ineligible")
public class EligibilityController {

    @GetMapping("")
    public ResponseEntity<CommonResponse> getAllIneligiblePeriods(){
        return null;
    }

    @PostMapping("")
    public ResponseEntity<CommonResponse> createIneligiblePeriod(@RequestBody EligibilityPeriod period){
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getIneligiblePeriodById(@PathVariable Long id){
        return null;
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CommonResponse> updateIneligiblePeriodById(@PathVariable Long id, @RequestBody EligibilityPeriod period){
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CommonResponse> deletedIneligiblePeriodById(@PathVariable Long id){
        return null;
    }
}
