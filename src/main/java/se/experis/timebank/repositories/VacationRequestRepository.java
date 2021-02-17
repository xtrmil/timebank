package se.experis.timebank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.experis.timebank.models.VacationRequest;

@Repository
public interface VacationRequestRepository extends JpaRepository<VacationRequest, Long> {
}
