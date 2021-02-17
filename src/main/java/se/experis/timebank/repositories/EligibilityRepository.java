package se.experis.timebank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.experis.timebank.models.EligibilityPeriod;

@Repository
public interface EligibilityRepository extends JpaRepository<EligibilityPeriod, Long> {
}
