package se.experis.timebank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import se.experis.timebank.models.User;
import se.experis.timebank.models.UserCredentials;
import se.experis.timebank.services.CommonResponse;
import se.experis.timebank.services.UserService;

import java.io.IOException;

@RestController
@RequestMapping(value = "/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("")
    public ResponseEntity<CommonResponse> createUser(@RequestBody User user) throws IOException {
        return userService.createUser(user);
    }

    @GetMapping("")
    public ResponseEntity<CommonResponse> getUser(@AuthenticationPrincipal UserCredentials userCredentials) {
        return userService.getUserById(userCredentials.getId());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CommonResponse> getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<CommonResponse> updateUserById(@RequestBody User user) {
        return userService.updateUserById(user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{userId}")
    public ResponseEntity<CommonResponse> deleteUserById(@PathVariable Long userId) {
        return userService.deleteUserById(userId);
    }

//    @PutMapping("/{userId}")
//    public ResponseEntity<CommonResponse> updatePasswordById(@RequestBody User user, @PathVariable Long userId){
//        return null;
//    }
}
