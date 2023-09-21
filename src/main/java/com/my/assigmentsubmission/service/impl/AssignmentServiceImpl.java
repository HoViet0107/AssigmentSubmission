package com.my.assigmentsubmission.service.impl;

import com.my.assigmentsubmission.Repository.AssignmentRepository;
import com.my.assigmentsubmission.model.Assignment;
import com.my.assigmentsubmission.model.User;
import com.my.assigmentsubmission.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AssignmentServiceImpl implements AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;

    @Override
    public Assignment createAssignment(User user) {
        Assignment assignment = new Assignment();
        assignment.setBranch("Dev branch");
        assignment.setStatus("Dev mode");
        assignment.setGithubUrl("Dev mode github URL");
        assignment.setCodeReviewVideoUrl("Dev mode video URl");
        assignment.setUser(user);
       return assignmentRepository.save(assignment);
    }

    @Override
    public Set<Assignment> findByUser(User user) {
        return assignmentRepository.findByUser(user);
    }
}
