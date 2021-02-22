package se.experis.timebank.services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import se.experis.timebank.models.User;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.repositories.UserRepository;
import se.experis.timebank.utils.JwtUtil;
import se.experis.timebank.utils.TotpManager;
import se.experis.timebank.utils.web.VerifyRequest;

import java.util.Optional;

@Service
public class UserCredentialsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TotpManager totpManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public UserCredentials loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        optionalUser.orElseThrow(() -> new UsernameNotFoundException(("Not found: "+ email)));
        return optionalUser.map(UserCredentials::new).get();
    }


    public ResponseEntity<CommonResponse> verifyLogin(VerifyRequest verifyRequest){

        CommonResponse cr =  new CommonResponse();
        Optional<User> optionalUser = userRepository.findByEmail(verifyRequest.getEmail());
        if(optionalUser.isPresent()){
            User user  = optionalUser.get();
            if(!totpManager.verifyCode(verifyRequest.getCode(), user.getSecret())) {
                cr.msg = "Invalid code";
                cr.status = HttpStatus.BAD_REQUEST;
            }else{
                if(!user.getIsVerified()){
                    user.setIsVerified(true);
                    userRepository.save(user);
                }
                cr.data = jwtUtil.generateToken(new UserCredentials(user));
                cr.msg = "Verification successful";
                cr.status = HttpStatus.OK;
            }

        }else{
            cr.msg = "User not found";
            cr.status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(cr,cr.status);
    }
}
