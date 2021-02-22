package se.experis.timebank.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import lombok.Data;
import org.springframework.stereotype.Component;
import javax.persistence.*;
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

    @Column
    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;

    @Column(nullable = false)
    private Boolean isAdmin;

    @Column
    private String profileImg;

    @Column
    @JsonProperty(access = Access.WRITE_ONLY)
    String secret;

    @OneToMany(mappedBy = "user")
    @JsonProperty(access = Access.WRITE_ONLY)
    private List<VacationRequest> vacationRequests;
}
