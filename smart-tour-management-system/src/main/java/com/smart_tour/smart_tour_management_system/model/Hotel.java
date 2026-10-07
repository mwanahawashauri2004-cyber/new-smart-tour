package com.smart_tour.smart_tour_management_system.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hotels")
@Data
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // mfano: Nungwi beach Hotel, Stone Town Boutique
    private String location;    // mfano: Nungwi, Stone Town, Kigamboni
    private Double pricePerNight; // bei kwa usiku mmoja
    private String imageUrl;    // link au njia ya picha ya hoteli
    private String description; // maelezo mafupi ya hoteli
}

