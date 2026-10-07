package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.Experience;
import com.smart_tour.smart_tour_management_system.repository.ExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceServiceImpl implements ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceServiceImpl(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @Override
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    @Override
    public List<Experience> getByMediaType(String mediaType) {
        return experienceRepository.findByMediaType(mediaType);
    }

    @Override
    public Experience saveExperience(Experience experience) {
        return experienceRepository.save(experience);
    }
}

