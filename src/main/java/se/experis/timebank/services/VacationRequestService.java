package se.experis.timebank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.experis.timebank.repositories.VacationRequestRepository;

@Service
public class VacationRequestService {

    public static final int maxPeriod = 25;

    @Autowired
    private VacationRequestRepository vacationRequestRepository;

    
}
