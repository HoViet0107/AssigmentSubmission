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

    // create assignment
    @PostMapping("")
    public ResponseEntity<?> createAssignments(@AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.createAssignment(user);
        return ResponseEntity.ok(newAssignment);
    }

    //    get all assignments
    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
        try {
            Set<Assignment> assignmentsByUser = assignmentService.findByUser(user);
            return ResponseEntity.ok(assignmentsByUser);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>("An error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    get assignment by id
    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId, @AuthenticationPrincipal User user) {
        try {
            Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);
            return ResponseEntity.ok(assignmentOpt.orElse(new Assignment()));
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>("An error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    update specific assignment with assignment id
    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignment(
            @PathVariable Long assignmentId,
            @RequestBody Assignment assignment,
            @AuthenticationPrincipal User user) {
        try {
            Assignment existAssignment = assignmentService.updateAssignment(assignment);
            return ResponseEntity.ok(existAssignment);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>("An error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
