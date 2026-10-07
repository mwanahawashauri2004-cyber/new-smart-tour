package com.smart_tour.smart_tour_management_system.controller;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "destinations")
@Data
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Serengeti Migration Safari, Nungwi Beach Escape, n.k.
    private String linkUrl;
}

