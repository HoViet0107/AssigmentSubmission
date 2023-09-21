package com.my.assigmentsubmission.service;

import com.my.assigmentsubmission.model.Assignment;
import com.my.assigmentsubmission.model.User;
import org.springframework.stereotype.Service;


public interface AssignmentService {
    Assignment createAssignment(User user);
}
