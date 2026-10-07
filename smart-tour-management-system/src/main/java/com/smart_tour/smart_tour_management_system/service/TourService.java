package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.Tour;
import java.util.List;

public interface TourService {

    List<Tour> getAllTours();

    Tour getTourById(Long id);

    List<Tour> searchTours(String keyword);

    Tour saveTour(Tour tour);

    void deleteTour(Long id); // Ongeza mstari huu hapa!
}