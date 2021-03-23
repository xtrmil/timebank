package se.experis.timebank.models;

import lombok.Data;
import org.springframework.stereotype.Component;
import javax.persistence.*;
;

@Entity
@Component
@Data
public class SingleVacationLimit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer length = 25;
}