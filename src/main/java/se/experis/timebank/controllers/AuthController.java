package se.experis.timebank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.services.CommonResponse;
import se.experis.timebank.services.UserCredentialsService;
import se.experis.timebank.services.UserService;
import se.experis.timebank.utils.JwtUtil;
import se.experis.timebank.utils.LoginRequest;

@RestController
@RequestMapping( value = "/api/v1/auth")
public class AuthController {

    @Autowired
    private UserCredentialsService userCredentialsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<CommonResponse> login(@RequestBody LoginRequest loginRequest){
        CommonResponse cr = new CommonResponse();
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail().toLowerCase(),loginRequest.getPassword()));
            UserCredentials userCredentials = userCredentialsService.loadUserByUsername(loginRequest.getEmail().toLowerCase());
            cr.data = jwtUtil.generateToken(userCredentials);
            cr.msg = "Login successful";
            cr.status = HttpStatus.OK;
        }catch (BadCredentialsException bce){
            cr.msg= "Wrong username or password";
            cr.status = HttpStatus.UNAUTHORIZED;
        }

        return  new ResponseEntity<>(cr,cr.status);
    }
}
