package se.experis.timebank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.experis.timebank.models.EligibilityPeriod;
import se.experis.timebank.models.User;
import se.experis.timebank.repositories.EligibilityRepository;

import java.util.Optional;

@Service
public class EligibilityService {

    @Autowired
    private EligibilityRepository eligibilityRepository;

    public ResponseEntity<CommonResponse> getAllIneligiblePeriods() {
        CommonResponse cr = new CommonResponse();
        cr.data = eligibilityRepository.findAll();  // add sorting chronological order (soonest first)
        cr.status = HttpStatus.OK;
        cr.msg = "all ineligible periods";

        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> createIneligiblePeriod(EligibilityPeriod newPeriod) {
        CommonResponse cr = new CommonResponse();
        eligibilityRepository.save(newPeriod);
        cr.data = newPeriod;
        cr.msg = "ineligble period added. Start: " + newPeriod.getStartDate() + " Stop: " + newPeriod.getEndDate();
        cr.status = HttpStatus.CREATED;

        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> getIneligiblePeriodById(Long id) {
        CommonResponse cr = new CommonResponse();
        Optional<EligibilityPeriod> eligibilityPeriodOptional = eligibilityRepository.findById(id);
        if (eligibilityPeriodOptional.isPresent()) {
            cr.data = eligibilityPeriodOptional.get();
            cr.msg = "Eligibilityperiod found with id: " + id;
            cr.status = HttpStatus.OK;

        } else {
            cr.msg = "No period found with id: " + id;
            cr.status = HttpStatus.NOT_FOUND;
        }

        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> updateIneligiblePeriodById(Long id, EligibilityPeriod newPeriod) {
        CommonResponse cr = new CommonResponse();

        Optional<EligibilityPeriod> optionalPeriod = eligibilityRepository.findById(id);
        if (optionalPeriod.isPresent()) {

            EligibilityPeriod period = optionalPeriod.get();
            if (newPeriod.getStartDate() != null) {
                period.setStartDate(newPeriod.getStartDate());
            }

            if (newPeriod.getEndDate() != null) {
                period.setEndDate(newPeriod.getEndDate());
            }
            cr.data = eligibilityRepository.save(period);
            cr.msg = "Eligibility Period with id " + id + " was updated";
            cr.status = HttpStatus.OK;
        } else {
            cr.msg = "Eligibility  with id " + id + " not found";
        }

        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> deleteIneligiblePeriodById(Long id) {
        CommonResponse cr = new CommonResponse();

        Optional<EligibilityPeriod> optionalPeriod = eligibilityRepository.findById(id);

        if (optionalPeriod.isPresent()) {
            eligibilityRepository.deleteById(id);
            cr.status = HttpStatus.OK;
            cr.msg = "Eligibility Period with id: " + id + " successfully deleted";
        } else {
            cr.msg = "Eligibility Period with id: " + id + " not found";
            cr.status = HttpStatus.NOT_FOUND;
        }

        return new ResponseEntity<>(cr, cr.status);

    }
}
