package com.smart_tour.smart_tour_management_system.DTO;


public class LoginRequest {
    private String email;
    private String password;

    // Default Constructor (Inatakiwa na Spring Boot kwa ajili ya JSON Deserialization)
    public LoginRequest() {
    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

