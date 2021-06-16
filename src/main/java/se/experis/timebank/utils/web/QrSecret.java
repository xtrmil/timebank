package se.experis.timebank.utils.web;

import lombok.Data;

@Data
public class QrSecret {

    private String qrUri;
    private String configCode;

    public QrSecret(){}

}
