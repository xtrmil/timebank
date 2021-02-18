package se.experis.timebank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing

public class TimebankApplication {

    public static void main(String[] args) {
        SpringApplication.run(TimebankApplication.class, args);
    }

}
