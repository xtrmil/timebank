package se.experis.timebank.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@Entity
@Component
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private boolean isAdmin;

    @Column
    private String profileImg;

    @JsonBackReference
    @OneToMany(mappedBy = "user")
    private List<VacationRequest> vacationRequests;
}
