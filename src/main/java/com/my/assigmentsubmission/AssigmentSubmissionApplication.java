package com.my.assigmentsubmission;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AssigmentSubmissionApplication {

    public static void main(String[] args) {
        SpringApplication.run(AssigmentSubmissionApplication.class, args);
        // PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        // System.out.println("encode password: " + passwordEncoder.encode("123456"));
    }

}
