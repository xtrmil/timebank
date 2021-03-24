package se.experis.timebank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.experis.timebank.models.User;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.services.CommonResponse;
import se.experis.timebank.services.UserService;
import se.experis.timebank.utils.web.UpdatePasswordRequest;

import java.io.IOException;

@RestController
@RequestMapping(value = "/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("")
    public ResponseEntity<CommonResponse> createUser(@RequestBody User user) throws IOException {
        return userService.createUser(user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<CommonResponse> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("")
    public ResponseEntity<CommonResponse> getUser(@AuthenticationPrincipal UserCredentials userCredentials) {
        return userService.getUserById(userCredentials.getId());
    }

    @PutMapping("")
    public ResponseEntity<CommonResponse> updateUserByToken(@AuthenticationPrincipal UserCredentials userCredentials, @RequestBody User user) {
        return userService.updateUserById(userCredentials.getId(),user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{userId}")
    public ResponseEntity<CommonResponse> updateUserById(@PathVariable Long userId, @RequestBody User user) {
        return userService.updateUserById(userId, user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{userId}")
    public ResponseEntity<CommonResponse> deleteUserById(@PathVariable Long userId) {
        return userService.deleteUserById(userId);
    }

   @GetMapping("/{userId}")
    public ResponseEntity<CommonResponse> getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PutMapping("/password")
    public ResponseEntity<CommonResponse> updatePasswordById(@AuthenticationPrincipal UserCredentials userCredentials, @RequestBody UpdatePasswordRequest updatePasswordRequest){

        return userService.updatePassword(userCredentials,updatePasswordRequest);
    }

    @PostMapping(value = "/upload/image", consumes = "multipart/form-data")
    public ResponseEntity<CommonResponse> uploadImage(@AuthenticationPrincipal UserCredentials userCredentials, @RequestParam("image") MultipartFile multipartFile){
        return userService.uploadImage(userCredentials,multipartFile);
    }
    @GetMapping("/get/image")
    public ResponseEntity<CommonResponse> getImageByToken(@AuthenticationPrincipal UserCredentials userCredentials){
        return userService.getImageByToken(userCredentials);

    }

}
