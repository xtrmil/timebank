package se.experis.timebank.services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import se.experis.timebank.models.User;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.repositories.UserRepository;

import java.util.Optional;

@Service
public class UserCredentialsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserCredentials loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        optionalUser.orElseThrow(() -> new UsernameNotFoundException(("Not found: "+ email)));
        return optionalUser.map(UserCredentials::new).get();
    }
}
