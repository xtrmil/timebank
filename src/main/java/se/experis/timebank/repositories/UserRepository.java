package se.experis.timebank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.experis.timebank.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
