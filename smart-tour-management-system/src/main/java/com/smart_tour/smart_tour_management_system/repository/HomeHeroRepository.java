package com.smart_tour.smart_tour_management_system.repository;

import com.smart_tour.smart_tour_management_system.model.HomeHero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeHeroRepository extends JpaRepository<HomeHero, Long> {
    // Tunachukua data ya hivi karibuni zaidi ya Hero Section
    HomeHero findTopByOrderByIdDesc();
}

