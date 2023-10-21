package com.my.assigmentsubmission.Repository;

import com.my.assigmentsubmission.enums.AssignmentStatusEnum;
import com.my.assigmentsubmission.model.Assignment;
import com.my.assigmentsubmission.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {
    Set<Assignment> findByUser(User user);

    @Query("select a from Assignment a " +
            "where a.status = 'submitted' " +
            "or a.codeReviewer = :codeReviewer")
    Set<Assignment> findByCodeReviewer(User codeReviewer);
}
