package se.experis.timebank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.experis.timebank.models.SingleVacationLimit;
import se.experis.timebank.models.User;

import java.util.Optional;

@Repository
public interface SingleVacationLengthRepository extends JpaRepository<SingleVacationLimit, Long> {

}
