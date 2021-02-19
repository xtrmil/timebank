package se.experis.timebank.utils;

import java.time.LocalDate;

import static java.time.temporal.ChronoUnit.DAYS;

public class Validations {

    public Validations() {
    }

    public long validatePeriodLength(LocalDate startDate, LocalDate endDate) {
        return DAYS.between(startDate, endDate);
    }

    /**TODO Check if date has passed -
     *  createVacationrequest
     *  createIneligiblePeriod */

}
