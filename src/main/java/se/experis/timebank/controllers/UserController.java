package se.experis.timebank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import se.experis.timebank.models.User;
import se.experis.timebank.services.CommonResponse;
import se.experis.timebank.services.UserService;

@RestController
@RequestMapping(value = "/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<CommonResponse> createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @GetMapping("")
    public ResponseEntity<CommonResponse> getUser(){
        return userService.getUser();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CommonResponse> getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<CommonResponse> updateUserById(@PathVariable Long userId){
        return null;
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<CommonResponse> deleteUserById(@PathVariable Long userId){
        return null;
    }
    /** Move to own repository? */
    //@GetMapping("/{userId}/requests")
    //public ResponseEntity<CommonResponse> get

    @PostMapping("/{userId}")
    public ResponseEntity<CommonResponse> updatePasswordById(
            @RequestBody User user,
            @PathVariable Long userId){
        return null;
    }
}
