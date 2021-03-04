package se.experis.timebank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.experis.timebank.models.RequestStatus;
import se.experis.timebank.models.VacationRequest;

import java.util.List;

@Repository
public interface VacationRequestRepository extends JpaRepository<VacationRequest, Long> {

    List<VacationRequest> findAllByUserIdOrderByStartDateDesc(Long userId);
    List<VacationRequest> findAllByUserId(Long userId);
    List<VacationRequest> findAllByStatusNot(RequestStatus status);
    List<VacationRequest> findAllByStatus(RequestStatus status);
}
