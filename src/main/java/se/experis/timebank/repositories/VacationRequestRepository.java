package se.experis.timebank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.experis.timebank.models.RequestStatus;
import se.experis.timebank.models.VacationRequest;

import java.util.List;

@Repository
public interface VacationRequestRepository extends JpaRepository<VacationRequest, Long> {

    List<VacationRequest> findAllByUserIdOrderByStartDateAsc(Long userId);
    List<VacationRequest> findAllByUserIdAndStatusOrderByStartDateAsc(Long userId, RequestStatus status);
    List<VacationRequest> findAllByUserId(Long userId);
    List<VacationRequest> findAllByStatusNot(RequestStatus status);
    List<VacationRequest> findAllByStatus(RequestStatus status);
}
