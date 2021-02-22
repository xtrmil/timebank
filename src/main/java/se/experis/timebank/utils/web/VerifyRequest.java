package se.experis.timebank.utils.web;

import lombok.Data;

@Data
public class VerifyRequest {
    private String email;
    private String code;

    public VerifyRequest(){}
}
