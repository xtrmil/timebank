package se.experis.timebank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.experis.timebank.models.IneligiblePeriod;

import java.util.List;

@Repository
public interface IneligibleRepository extends JpaRepository<IneligiblePeriod, Long> {
    List<IneligiblePeriod> findAllByOrderByStartDateAsc();
}
