package com.smart_tour.smart_tour_management_system.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "home_hero")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class HomeHero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brandName;       // Smart Zanzibar Tour
    private String tagline;         // Discover. Explore. Experience.[cite: 6]
    private String mainHeading;     // Explore Zanzibar[cite: 6]

    @Column(length = 1000)
    private String description;     // Get the unforgettable experience...[cite: 6]

    private String backgroundImage; // URL au path ya picha ya background[cite: 6]
}
