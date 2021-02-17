package se.experis.timebank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import se.experis.timebank.models.User;
import se.experis.timebank.repositories.UserRepository;

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

    public ResponseEntity<CommonResponse> getUser() {
        CommonResponse cr = new CommonResponse();

        try{
            cr.data = null;
            cr.msg = "User by id:" + " was found.";
            cr.status = HttpStatus.OK;
        } catch(Exception e) {
            cr.data = e.getMessage();
            cr.msg = " Currently unable to get user";
            cr.status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(cr, cr.status);
    }

    public ResponseEntity<CommonResponse> getUserById(Long id) {
        CommonResponse cr = new CommonResponse();

        try{
            cr.data = userRepository.findById(id).get();
            cr.msg = "User with id:" + id + " was found.";
            cr.status = HttpStatus.OK;
        } catch(Exception e){
            cr.data = e.getMessage();
            cr.msg = "User with id: " + id + " was not found";
            cr.status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(cr, cr.status);
    }


}
