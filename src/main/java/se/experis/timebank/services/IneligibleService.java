package se.experis.timebank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.experis.timebank.models.IneligiblePeriod;
import se.experis.timebank.models.User;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.repositories.IneligibleRepository;
import se.experis.timebank.repositories.UserRepository;
import se.experis.timebank.utils.Validations;

import java.util.Optional;

@Service
public class IneligibleService {

    @Autowired
    private IneligibleRepository ineligibleRepository;
    @Autowired
    private UserRepository userRepository;

    private Validations validation = new Validations();

    public ResponseEntity<CommonResponse> getAllIneligiblePeriods() {
        CommonResponse cr = new CommonResponse();
        cr.data = ineligibleRepository.findAllByOrderByStartDateAsc();  // add sorting chronological order (soonest first)
        cr.status = HttpStatus.OK;
        cr.msg = "all ineligible periods";

        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> createIneligiblePeriod(IneligiblePeriod newPeriod, UserCredentials userCredentials) {
        CommonResponse cr = new CommonResponse();

        Optional<User> optionalUser = userRepository.findById(userCredentials.getId());

        if (optionalUser.isPresent() &&
                validation.validatePeriodLength(newPeriod.getStartDate(), newPeriod.getEndDate()) >= 0) {
            newPeriod.setCreatedBy(optionalUser.get());
            ineligibleRepository.save(newPeriod);
            cr.data = newPeriod;
            cr.msg = "ineligible period added. Start: " + newPeriod.getStartDate() + " Stop: " + newPeriod.getEndDate();
            cr.status = HttpStatus.CREATED;
        } else {
            cr.msg = "Unable to add ineligible period.";
            cr.status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> getIneligiblePeriodById(Long id) {
        CommonResponse cr = new CommonResponse();
        Optional<IneligiblePeriod> eligibilityPeriodOptional = ineligibleRepository.findById(id);

        if (eligibilityPeriodOptional.isPresent()) {
            cr.data = eligibilityPeriodOptional.get();
            cr.msg = "Eligibility period found with id: " + id;
            cr.status = HttpStatus.OK;
        } else {
            cr.msg = "No period found with id: " + id;
            cr.status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> updateIneligiblePeriodById(Long id, IneligiblePeriod newPeriod) {
        CommonResponse cr = new CommonResponse();

        Optional<IneligiblePeriod> optionalPeriod = ineligibleRepository.findById(id);
        if (optionalPeriod.isPresent()) {

            IneligiblePeriod period = optionalPeriod.get();
            if (newPeriod.getStartDate() != null) {
                period.setStartDate(newPeriod.getStartDate());
            }

            if (newPeriod.getEndDate() != null) {
                period.setEndDate(newPeriod.getEndDate());
            }
            cr.data = ineligibleRepository.save(period);
            cr.msg = "Eligibility Period with id " + id + " was updated";
            cr.status = HttpStatus.OK;
        } else {
            cr.msg = "Eligibility  with id " + id + " not found";
            cr.status = HttpStatus.NOT_FOUND;
        }

        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> deleteIneligiblePeriodById(Long id) {
        CommonResponse cr = new CommonResponse();

        Optional<IneligiblePeriod> optionalPeriod = ineligibleRepository.findById(id);

        if (optionalPeriod.isPresent()) {
            ineligibleRepository.deleteById(id);
            cr.status = HttpStatus.OK;
            cr.msg = "Eligibility Period with id: " + id + " successfully deleted";
        } else {
            cr.msg = "Eligibility Period with id: " + id + " not found";
            cr.status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(cr, cr.status);

    }
}
