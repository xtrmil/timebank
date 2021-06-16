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
import se.experis.timebank.utils.*;
import se.experis.timebank.utils.web.LoginRequest;
import se.experis.timebank.utils.web.QrSecret;
import se.experis.timebank.utils.web.VerifyRequest;

import java.io.IOException;

@RestController
@RequestMapping( value = "/api/v1/auth")
public class AuthController {

    @Autowired
    private UserCredentialsService userCredentialsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private TotpManager totpManager;

    @PostMapping("/login")
    public ResponseEntity<CommonResponse> login(@RequestBody LoginRequest loginRequest){
        CommonResponse cr = new CommonResponse();
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail().toLowerCase(),loginRequest.getPassword()));
            UserCredentials userCredentials = userCredentialsService.loadUserByUsername(loginRequest.getEmail().toLowerCase());
            if(!userCredentials.isVerified()){
                QrSecret qrSecret = new QrSecret();
                qrSecret.setQrUri(totpManager.getUriForImage(userCredentials.getSecret(),userCredentials.getEmail()));
                qrSecret.setConfigCode(userCredentials.getSecret());
                cr.msg = "Scan or enter config code";
                cr.data = qrSecret;
            }else{
                cr.msg = "Enter verification code";
            }
            cr.status = HttpStatus.OK;

        }catch (BadCredentialsException | IOException bce){
            cr.msg= "Wrong username or password";
            cr.status = HttpStatus.UNAUTHORIZED;
        }

        return  new ResponseEntity<>(cr,cr.status);
    }

    @PostMapping("/verify")
    public ResponseEntity<CommonResponse> verifyLogin(@RequestBody VerifyRequest verifyRequest){
        return userCredentialsService.verifyLogin(verifyRequest);
    }
}
