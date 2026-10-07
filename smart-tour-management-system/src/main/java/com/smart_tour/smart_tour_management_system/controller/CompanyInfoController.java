package com.smart_tour.smart_tour_management_system.controller;

import com.smart_tour.smart_tour_management_system.model.CompanyInfo;
import com.smart_tour.smart_tour_management_system.service.CompanyInfoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/footer")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyInfoController {

    private final CompanyInfoService contactService;

    public CompanyInfoController(CompanyInfoService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/info")
    public CompanyInfo getContact() {
        return contactService.getCompanyInfo();
    }
}
