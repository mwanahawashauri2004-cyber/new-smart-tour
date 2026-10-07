package com.smart_tour.smart_tour_management_system.repository;

import com.smart_tour.smart_tour_management_system.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience> findByMediaType(String mediaType);
}
