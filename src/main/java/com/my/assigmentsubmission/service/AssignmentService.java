package com.my.assigmentsubmission.service;

import com.my.assigmentsubmission.model.Assignment;
import com.my.assigmentsubmission.model.User;

import java.util.Optional;
import java.util.Set;


public interface AssignmentService {
    Assignment createAssignment(User user);

    Set<Assignment> findByUser(User user);

    Optional<Assignment> findById(Integer assignmentId);

    Assignment updateAssignment(Assignment assignment);
    Assignment updateAssignmentCodeReviewer(Assignment assignment);
}
