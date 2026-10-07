package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.User;
import com.smart_tour.smart_tour_management_system.repository.UserRepository;
import com.smart_tour.smart_tour_management_system.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mtumiaji hajapatikana kwa ID: " + id));
    }

    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }
}

