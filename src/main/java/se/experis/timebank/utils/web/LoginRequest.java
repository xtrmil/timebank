package se.experis.timebank.utils.web;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String password;

    public LoginRequest(){}
}
