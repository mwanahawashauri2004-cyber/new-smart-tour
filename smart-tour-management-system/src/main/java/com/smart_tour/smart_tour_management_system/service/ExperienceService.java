package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.Experience;
import java.util.List;

public interface ExperienceService {
    List<Experience> getAllExperiences();
    List<Experience> getByMediaType(String mediaType);
    Experience saveExperience(Experience experience);
}

