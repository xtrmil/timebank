package se.experis.timebank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import se.experis.timebank.models.User;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.repositories.UserRepository;
import se.experis.timebank.utils.JwtUtil;
import se.experis.timebank.utils.TotpManager;

import java.io.IOException;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TotpManager totpManager;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<CommonResponse> createUser(User user) throws IOException {
        CommonResponse cr = new CommonResponse();

        if(!userRepository.existsByEmail(user.getEmail())){
            String encodedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
            user.setPassword(encodedPassword);
            user.setSecret(totpManager.generateSecret());
            totpManager.getUriForImage(user.getSecret(), user.getEmail());
            cr.data =  userRepository.save(user);
            cr.msg = "User with id:" + user.getId() + " created";
            cr.status = HttpStatus.CREATED;
        }else {
            cr.msg = "User with email: " + user.getEmail() + " already exists.";
            cr.status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(cr,cr.status);
    }

    public ResponseEntity<CommonResponse> getUserById(Long userId) {
        CommonResponse cr = new CommonResponse();

        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()){
            cr.data = userRepository.findById(userId).get();
            cr.msg = "User with id:" + userId + " was found.";
            cr.status = HttpStatus.OK;
        } else {
            cr.msg = "User with id: " + userId + " was not found";
            cr.status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> updateUserById(Long userId, User userToUpdate){
        CommonResponse cr = new CommonResponse();

        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()) {

                User user = optionalUser.get();
                if (userToUpdate.getFirstName() != null) {
                    user.setFirstName(userToUpdate.getFirstName());
                }
                if (userToUpdate.getLastName() != null) {
                    user.setLastName(userToUpdate.getLastName());
                }
                if (userToUpdate.getEmail() != null) {
                    user.setEmail(userToUpdate.getEmail());
                }
                if (userToUpdate.getProfileImg() != null) {
                    user.setProfileImg(userToUpdate.getProfileImg());
                }
                User updatedUser = userRepository.save(user);
                UserCredentials credentials = new UserCredentials(updatedUser);
                cr.data = jwtUtil.generateToken(credentials);
                cr.msg = "User with id " + userId + " was updated";
                cr.status = HttpStatus.OK;

        }else{
            cr.msg = "User with id " + userToUpdate.getId() + " not found";
            cr.status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> deleteUserById(Long userId){
        CommonResponse cr = new CommonResponse();

        Optional<User> optionalUser = userRepository.findById(userId);

        if(optionalUser.isPresent()){
            userRepository.deleteById(userId);
            cr.status = HttpStatus.OK;
            cr.msg = "User with id: " + userId + " successfully deleted";
        } else {
            cr.msg = "User with id: " + userId + " not found";
            cr.status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(cr,cr.status);
    }
}
