package se.experis.timebank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.experis.timebank.models.User;
import se.experis.timebank.repositories.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<CommonResponse> createUser(User user){
        CommonResponse cr = new CommonResponse();
        userRepository.save(user);
        cr.data = user;
        cr.msg = "User with id:" + user.getId() + " created";
        cr.status = HttpStatus.CREATED;

        return new ResponseEntity<>(cr,cr.status);
    }

    public ResponseEntity<CommonResponse> getUser() {   // addera token
        CommonResponse cr = new CommonResponse();

        try{
            cr.msg = "User by id:" + " was found.";
            cr.status = HttpStatus.OK;
        } catch(Exception e) {
            cr.data = e.getMessage();
            cr.msg = " Currently unable to get user";
            cr.status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(cr, cr.status);
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

    public ResponseEntity<CommonResponse> updateUserById(Long userId, User newUser){
        CommonResponse cr = new CommonResponse();

        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()) {

            User user = optionalUser.get();
            if (newUser.getFirstName() != null) {
                user.setFirstName(newUser.getFirstName());
            }
            if (newUser.getLastName() != null) {
                user.setLastName(newUser.getLastName());

            }
            if (newUser.getEmail() != null) {
                user.setEmail(newUser.getEmail());
            }
            if (newUser.getProfileImg() != null) {
                user.setProfileImg(newUser.getProfileImg());
            }
            cr.data = userRepository.save(user);
            cr.msg = "User with id " + userId + " was updated";
            cr.status = HttpStatus.OK;
        }else{
            cr.msg = "User with id " + userId + " not found";
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
