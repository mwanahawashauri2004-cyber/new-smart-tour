package com.smart_tour.smart_tour_management_system.controller;

import com.smart_tour.smart_tour_management_system.model.Tour;
import com.smart_tour.smart_tour_management_system.service.TourService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tours")
@CrossOrigin(origins = " http://localhost:5173/")
public class TourController {

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    @GetMapping
    public ResponseEntity<List<Tour>> getAllTours(@RequestParam(required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(tourService.searchTours(search));
        }
        return ResponseEntity.ok(tourService.getAllTours());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tour> getTourById(@PathVariable Long id) {
        return ResponseEntity.ok(tourService.getTourById(id));
    }

    @PostMapping
    public ResponseEntity<Tour> createTour(@RequestBody Tour tour) {
        // Tumia saveTour badala ya createTour
        Tour createdTour = tourService.saveTour(tour);
        return new ResponseEntity<>(createdTour, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable Long id) {
        // Hakikisha deleteTour ipo kwenye TourService au tumia jina uliloweka kule
        tourService.deleteTour(id);
        return ResponseEntity.noContent().build();
    }
}