package com.smart_tour.smart_tour_management_system.controller;

import com.smart_tour.smart_tour_management_system.model.User;
import com.smart_tour.smart_tour_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
// Rekebisho: Imeondolewa space na slash ya mwisho, na kuongezewa localhost zingine
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // 1. POST: Kujisajili (Register User)
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // 2. POST: Kuingia (Login User)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        Optional<User> userOptional = userRepository.findByEmail(loginData.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(loginData.getPassword())) {
                return ResponseEntity.ok(user); // Status 200 OK
            }
        }
        // Badala ya kurudisha String pekee, tunarudisha HTTP Status 401 Bad Request ili React ijue imefeli
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect Email or Password!");
    }
}