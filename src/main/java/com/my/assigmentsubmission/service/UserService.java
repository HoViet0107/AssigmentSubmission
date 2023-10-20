package com.my.assigmentsubmission.service;


import com.my.assigmentsubmission.model.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findUserByUserName(String username);

    Optional<User> findUserIdByUsername(String username);
}
