package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User registerUser(User user);
}

