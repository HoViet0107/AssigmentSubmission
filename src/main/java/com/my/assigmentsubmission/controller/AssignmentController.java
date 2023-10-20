package com.my.assigmentsubmission.controller;

import com.my.assigmentsubmission.Repository.UserRepository;
import com.my.assigmentsubmission.dto.AssignmentResponseDto;
import com.my.assigmentsubmission.enums.AuthorityEnum;
import com.my.assigmentsubmission.model.Assignment;
import com.my.assigmentsubmission.model.User;
import com.my.assigmentsubmission.service.AssignmentService;
import com.my.assigmentsubmission.service.UserService;
import com.my.assigmentsubmission.util.AuthorityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

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
            return new ResponseEntity<>("An error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    get assignment by id
    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Integer assignmentId, @AuthenticationPrincipal User user) {
        try {
            Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);
            AssignmentResponseDto response = new AssignmentResponseDto(assignmentOpt.orElse(new Assignment()));
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>("An error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //    update specific assignment with assignment id
    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignment(
            @PathVariable Integer assignmentId,
            @RequestBody Assignment assignment,
            @AuthenticationPrincipal User user) {
        try {
            // add the code reviewer to this assignment if it was claimed
            if (assignment.getCodeReviewer() != null) {
                User codeReviewer = assignment.getCodeReviewer();
                User userSubmittedAssignment = assignment.getUser();
                codeReviewer = userService.findUserByUserName(codeReviewer.getUsername()).orElse(new User());
                userSubmittedAssignment = userRepository.findByAssignmentId(assignmentId);
                if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), codeReviewer)) {
                    assignment.setCodeReviewer(codeReviewer);
                    assignment.setUser(userSubmittedAssignment);
                    assignment.setId(assignmentId);
                }
                Assignment existedAssignment = assignmentService.updateAssignmentCodeReviewer(assignment);
                return ResponseEntity.ok(existedAssignment);
            } else {
                Assignment existedAssignment = assignmentService.updateAssignment(assignment);
                return ResponseEntity.ok(existedAssignment);
            }
        } catch (Exception ex) {
            Logger.getLogger(AssignmentController.class.getName()).log(Level.SEVERE, "An error occurred", ex);
            return new ResponseEntity<>("An error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
