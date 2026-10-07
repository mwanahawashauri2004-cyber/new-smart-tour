package com.smart_tour.smart_tour_management_system.controller;

import com.smart_tour.smart_tour_management_system.model.Experience;
import com.smart_tour.smart_tour_management_system.service.ExperienceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = " http://localhost:5173/")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public List<Experience> getAllExperiences() {
        return experienceService.getAllExperiences();
    }

    @GetMapping("/type/{type}")
    public List<Experience> getByMediaType(@PathVariable String type) {
        return experienceService.getByMediaType(type.toUpperCase());
    }

    @PostMapping
    public Experience createExperience(@RequestBody Experience experience) {
        return experienceService.saveExperience(experience);
    }
}
