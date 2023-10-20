package com.my.assigmentsubmission.Repository;

import com.my.assigmentsubmission.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    @Query("select u.id from User u where u.username =: username")
    Optional<User> findUserIdByUsername(@Param("username") String username);

    @Query("select u from  User u " +
            "left join Assignment a " +
            "on u.id = a.user.id " +
            "where a.id = :assignmentId")
    User findByAssignmentId(@Param("assignmentId") Integer assignmentId);
}
