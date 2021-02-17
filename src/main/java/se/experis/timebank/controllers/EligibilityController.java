package se.experis.timebank.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.experis.timebank.models.EligibilityPeriod;
import se.experis.timebank.services.CommonResponse;
import se.experis.timebank.services.EligibilityService;

@RestController
@RequestMapping("/api/v1/ineligible")
public class EligibilityController {

    @Autowired
    private EligibilityService eligibilityService;

    @GetMapping("")
    public ResponseEntity<CommonResponse> getAllIneligiblePeriods() {
        return eligibilityService.getAllIneligiblePeriods();
    }

    @PostMapping("")
    public ResponseEntity<CommonResponse> createIneligiblePeriod(@RequestBody EligibilityPeriod period) {

        return eligibilityService.createIneligiblePeriod(period);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getIneligiblePeriodById(@PathVariable Long id) {

        return eligibilityService.getIneligiblePeriodById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommonResponse> updateIneligiblePeriodById(@PathVariable Long id, @RequestBody EligibilityPeriod newPeriod) {
        return eligibilityService.updateIneligiblePeriodById(id, newPeriod);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CommonResponse> deletedIneligiblePeriodById(@PathVariable Long id) {

        return eligibilityService.deleteIneligiblePeriodById(id);
    }
}
