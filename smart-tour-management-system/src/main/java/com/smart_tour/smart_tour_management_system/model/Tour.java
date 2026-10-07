package com.smart_tour.smart_tour_management_system.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tours")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String location;
    private Integer durationDays;
    private Double price;
    private String imageCover;
}