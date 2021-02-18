package se.experis.timebank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.experis.timebank.models.Comment;
import se.experis.timebank.models.VacationRequest;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByVacationRequestId(Long requestId);
}
