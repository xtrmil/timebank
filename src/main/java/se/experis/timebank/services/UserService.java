package se.experis.timebank.services;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.experis.timebank.models.SingleVacationLimit;
import se.experis.timebank.models.User;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.repositories.SingleVacationLengthRepository;
import se.experis.timebank.repositories.UserRepository;
import se.experis.timebank.utils.JwtUtil;
import se.experis.timebank.utils.TotpManager;
import se.experis.timebank.utils.web.UpdatePasswordRequest;

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

    @Autowired
    private BCryptPasswordEncoder encoder;

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

    public ResponseEntity<CommonResponse> getAllUsers(){
        CommonResponse cr = new CommonResponse();
        cr.data = userRepository.findAll();
        cr.status = HttpStatus.OK;
        cr.msg = "List of all users.";

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

                if (userToUpdate.getPassword().length() > 0){
                    user.setPassword(encoder.encode(userToUpdate.getPassword()));
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

    public ResponseEntity<CommonResponse> updatePassword(UserCredentials userCredentials, UpdatePasswordRequest updatePasswordRequest){
        CommonResponse cr = new CommonResponse();
       if( encoder.matches(updatePasswordRequest.getCurrentPassword(), userCredentials.getPassword())){
           Optional<User> optionalUser = userRepository.findById(userCredentials.getId());
           if(optionalUser.isPresent()){
               User user = optionalUser.get();
               user.setPassword(encoder.encode(updatePasswordRequest.getNewPassword()));
               userRepository.save(user);
               cr.msg = "Password was updated successfully";
               cr.status = HttpStatus.OK;
           }else{
               cr.msg = "User with id: " + userCredentials.getId() + " not found";
               cr.status = HttpStatus.NOT_FOUND;
           }
       }else{
           cr.msg = "Wrong password";
           cr.status = HttpStatus.UNAUTHORIZED;
       }
        return new ResponseEntity<>(cr,cr.status);
    }
    public ResponseEntity<CommonResponse> uploadImage(UserCredentials userCredentials, MultipartFile multipartFile){
        CommonResponse cr = new CommonResponse();
        StringBuilder sb = new StringBuilder();

        Optional<User> optionalUser = userRepository.findById(userCredentials.getId());

        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            try{
                sb.append("data:image/png;base64,");
                sb.append(StringUtils.newStringUtf8(Base64.encodeBase64(multipartFile.getBytes(), false)));
                user.setProfileImg(sb.toString());
                userRepository.save(user);
                cr.data = sb.toString();
                cr.msg = "Upload image success";
                cr.status = HttpStatus.OK;
            }
            catch (IOException ioException){
                cr.msg = "Could not upload file";
                cr.status = HttpStatus.BAD_REQUEST;
            }
        }else{
            cr.msg ="user was not found";
            cr.status = HttpStatus.NOT_FOUND;
        }

        return new ResponseEntity<>(cr,cr.status);
    }

    public ResponseEntity<CommonResponse> getImageByToken(UserCredentials userCredentials){
        CommonResponse cr = new CommonResponse();

        Optional<User> optionalUser = userRepository.findById(userCredentials.getId());

        if(optionalUser.isPresent()){
            User user = optionalUser.get();
                cr.data = user.getProfileImg();
                cr.msg = "Upload image success";
                cr.status = HttpStatus.OK;
        }else{
            cr.msg ="user was not found";
            cr.status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(cr,cr.status);
    }


}
