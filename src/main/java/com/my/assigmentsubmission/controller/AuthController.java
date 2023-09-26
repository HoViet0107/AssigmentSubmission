package com.my.assigmentsubmission.controller;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.my.assigmentsubmission.dto.AuthCredentialsRequest;
import com.my.assigmentsubmission.model.User;
import com.my.assigmentsubmission.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    // @Autowired
    // private UserView

    @PostMapping(value = "login")
    public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()));

            User user = (User) authenticate.getPrincipal();

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION, jwtUtil.generateToken(
                                    user))
                    .body(user);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred: ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("validate")
    public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal User user) {
        try {
            Boolean isTokenValid = jwtUtil.validateToken(token, user);
            return ResponseEntity.ok(isTokenValid);
        } catch (ExpiredJwtException exp) {
            exp.printStackTrace();
            return ResponseEntity.ok(false);
        }
    }
}
