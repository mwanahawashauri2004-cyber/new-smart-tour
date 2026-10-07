package com.smart_tour.smart_tour_management_system.repository;

import com.smart_tour.smart_tour_management_system.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {

    // Njia hii ya @Query ndiyo bora zaidi na haitakuletea error yoyote!
    @Query("SELECT t FROM Tour t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Tour> searchToursByKeyword(@Param("keyword") String keyword);
}