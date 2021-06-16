package se.experis.timebank.models;

import javax.persistence.OneToMany;
import java.util.List;

public class Admin extends User{

    @OneToMany(mappedBy = "admin")
    private List<VacationRequest> vacationRequests;
}
