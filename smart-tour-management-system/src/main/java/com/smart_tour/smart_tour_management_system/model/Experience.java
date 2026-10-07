package com.smart_tour.smart_tour_management_system.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "experiences")
@Data
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;       // mfano: Maasai Culture, Wildlife Safari, Dolphin Tour
    private String mediaType;   // mfano: VIDEO au IMAGE
    private String mediaUrl;    // link ya video au picha
    private String category;    // mfano: Safari, Beach, Culture
}

