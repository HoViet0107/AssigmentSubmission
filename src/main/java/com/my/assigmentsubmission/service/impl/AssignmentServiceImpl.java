package com.my.assigmentsubmission.service.impl;

import com.my.assigmentsubmission.Repository.AssignmentRepository;
import com.my.assigmentsubmission.enums.AssignmentStatusEnum;
import com.my.assigmentsubmission.enums.AuthorityEnum;
import com.my.assigmentsubmission.model.Assignment;
import com.my.assigmentsubmission.model.User;
import com.my.assigmentsubmission.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentServiceImpl implements AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;

    @Override
    public Assignment createAssignment(User user) {
        Assignment assignment = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setNumber(findNextAssignmentToSubmit(user));
        assignment.setUser(user);
        return assignmentRepository.save(assignment);
    }

    private Integer findNextAssignmentToSubmit(User user) {
        Set<Assignment> assignmentByUser = assignmentRepository.findByUser(user);
        if (assignmentByUser == null) {
            return 1;
        }
        Optional<Integer> nextAssignmentNumberOpt = assignmentByUser.stream().sorted((assignment1, assignment2) -> {
            if (assignment1.getNumber() == null) {
                return -1;
            }
            if (assignment2.getNumber() == null) {
                return -1;
            }
            return assignment2.getNumber().compareTo(assignment1.getNumber());
        }).map(assignment -> {
            if (assignment.getNumber() == null) {
                return 1;
            } else {
                return assignment.getNumber() + 1;
            }
        }).findFirst();

        return nextAssignmentNumberOpt.orElse(1);
    }

    @Override
    public Set<Assignment> findByUser(User user) {
        //load assignment if you're code reviewer
        boolean hasCodeReviewerRole = user.getAuthorities()
                .stream()
                .filter(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority()))
                .count() > 0;
        if (hasCodeReviewerRole) {
            return assignmentRepository.findByCodeReviewer(user);
        } else {
            //load assignment ì you're student
            return assignmentRepository.findByUser(user);
        }
    }

    @Override
    public Optional<Assignment> findById(Integer assignmentId) {
        return assignmentRepository.findById(assignmentId);
    }

    @Override
    public Assignment updateAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @Override
    public Assignment updateAssignmentCodeReviewer(Assignment assignment) {
        Assignment existedAssignment = findExistedAssignment(assignment.getId());
        existedAssignment.setStatus(assignment.getStatus());
        existedAssignment.setCodeReviewer(assignment.getCodeReviewer());
        return assignmentRepository.save(existedAssignment);
    }

    // get the existed assignment
    public Assignment findExistedAssignment(Integer assignmentId){
        return assignmentRepository.findById(assignmentId).orElse(null);
    }
}
