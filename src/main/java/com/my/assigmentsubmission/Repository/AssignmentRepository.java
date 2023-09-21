package com.my.assigmentsubmission.Repository;

import com.my.assigmentsubmission.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
}
