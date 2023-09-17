package com.my.assigmentsubmission;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderTest {

    @Test
    void encode_password() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        System.out.println("encode password: " + passwordEncoder.encode("123456"));
    }
}