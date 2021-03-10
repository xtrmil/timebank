package se.experis.timebank.utils.web;

import lombok.Data;

@Data
public class UpdatePasswordRequest {

    private String currentPassword;
    private String newPassword;

    public UpdatePasswordRequest() {
    }
}
