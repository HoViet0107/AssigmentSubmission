package com.my.assigmentsubmission.controller;

import com.my.assigmentsubmission.model.Assignment;
import com.my.assigmentsubmission.model.User;
import com.my.assigmentsubmission.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;

    @PostMapping("")
    public ResponseEntity<?> createAssignments(@AuthenticationPrincipal User user){
//        try {
            Assignment newAssignment = assignmentService.createAssignment(user);
            return ResponseEntity.ok(newAssignment);
//        } catch (Exception e){
//            return new ResponseEntity<>("Tạo assignment thất bại!", HttpStatus.UNAUTHORIZED);
//        }
    }
}
