package com.my.assigmentsubmission.service.impl;


import com.my.assigmentsubmission.Repository.UserRepository;
import com.my.assigmentsubmission.model.User;
import com.my.assigmentsubmission.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<User> findUserByUserName(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findUserIdByUsername(String username) {
        return userRepository.findUserIdByUsername(username);
    }
}
