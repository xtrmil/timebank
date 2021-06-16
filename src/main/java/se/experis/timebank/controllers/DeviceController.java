package se.experis.timebank.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import se.experis.timebank.services.CommonResponse;

@Controller
public class DeviceController {

    @GetMapping("/api/v1/device")
    public ResponseEntity<CommonResponse> checkOS(Device device) {
        CommonResponse cr = new CommonResponse();
        cr.status = HttpStatus.OK;

        if (device.isNormal() || device.getDevicePlatform().name().equalsIgnoreCase("UNKNOWN")) {
            cr.data = "browser";
        } else {
            cr.data = device.getDevicePlatform().name();
        }
        return new ResponseEntity<>(cr, cr.status);
    }

}
