package com.smart_tour.smart_tour_management_system.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "contact_info")
@Data
public class CompanyInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String location;     // Mwankerekwe, Zanzibar
    private String phone;        // +225 741 910 076
    private String email;        // info@afriluxe.com
    private String workingHours; // 24/6 open.Sunday closed
}
