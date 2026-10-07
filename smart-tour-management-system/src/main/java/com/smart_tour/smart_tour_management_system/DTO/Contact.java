package com.smart_tour.smart_tour_management_system.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    private String fullName;
    private String email;
    private String subject;
    private String message;
}

