package com.my.assigmentsubmission.controller;

import com.my.assigmentsubmission.model.Assignment;
import com.my.assigmentsubmission.model.User;
import com.my.assigmentsubmission.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;

    @PostMapping("")
    public ResponseEntity<?> createAssignments(@AuthenticationPrincipal User user){
        try {
            Assignment newAssignment = assignmentService.createAssignment(user);
            return ResponseEntity.ok(newAssignment);
        } catch (Exception ex){
            return new ResponseEntity<>("Tạo assignment thất bại! "+ ex.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignments (@AuthenticationPrincipal User user){
        try {
            Set<Assignment> assignmentsByUser =assignmentService.findByUser(user);
            return ResponseEntity.ok(assignmentsByUser);
        } catch (Exception ex){
            return new ResponseEntity<>("An error occurred: "+ ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignmentById (@PathVariable Long assignmentId ,@AuthenticationPrincipal User user){
        try {
            Optional<Assignment> assignmentOpt =assignmentService.findById(assignmentId);
            return ResponseEntity.ok(assignmentOpt.orElse(new Assignment()));
        } catch (Exception ex){
            return new ResponseEntity<>("An error occurred: "+ ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
