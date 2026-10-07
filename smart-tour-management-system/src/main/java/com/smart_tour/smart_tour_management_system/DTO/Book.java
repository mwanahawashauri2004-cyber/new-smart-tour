package com.smart_tour.smart_tour_management_system.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    private String fullName;
    private String email;
    private LocalDate tourDate;
    private Integer tourists;
    private String paymentMethod;
}

