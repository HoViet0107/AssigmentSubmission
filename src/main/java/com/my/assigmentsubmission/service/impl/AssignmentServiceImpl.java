package com.my.assigmentsubmission.service.impl;

import com.my.assigmentsubmission.Repository.AssignmentRepository;
import com.my.assigmentsubmission.enums.AssignmentStatusEnum;
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
        return assignmentRepository.findByUser(user);
    }

    @Override
    public Optional<Assignment> findById(Long assignmentId) {
        return assignmentRepository.findById(assignmentId);
    }

    @Override
    public Assignment updateAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }
}
