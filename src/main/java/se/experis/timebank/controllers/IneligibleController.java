package se.experis.timebank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import se.experis.timebank.models.IneligiblePeriod;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.services.CommonResponse;
import se.experis.timebank.services.IneligibleService;

@RestController
@RequestMapping("/api/v1/ineligible")
public class IneligibleController {

    @Autowired
    private IneligibleService ineligibleService;

    @GetMapping("")
    public ResponseEntity<CommonResponse> getAllIneligiblePeriods() {
        return ineligibleService.getAllIneligiblePeriods();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("")
    public ResponseEntity<CommonResponse> createIneligiblePeriod(@AuthenticationPrincipal UserCredentials userCredentials,
                                                                 @RequestBody IneligiblePeriod period) {
        return ineligibleService.createIneligiblePeriod(period, userCredentials);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getIneligiblePeriodById(@PathVariable Long id) {
        return ineligibleService.getIneligiblePeriodById(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CommonResponse> updateIneligiblePeriodById(@PathVariable Long id, @RequestBody IneligiblePeriod newPeriod) {
        return ineligibleService.updateIneligiblePeriodById(id, newPeriod);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<CommonResponse> deletedIneligiblePeriodById(@PathVariable Long id) {
        return ineligibleService.deleteIneligiblePeriodById(id);
    }
}
