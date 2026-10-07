package com.smart_tour.smart_tour_management_system.service;


import com.smart_tour.smart_tour_management_system.model.Hotel;
import com.smart_tour.smart_tour_management_system.model.Hotel;
import com.smart_tour.smart_tour_management_system.repository.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;

    public HotelServiceImpl(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @Override
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel haijapatikana kwa ID: " + id));
    }

    @Override
    public List<Hotel> searchHotels(String keyword) {
        return hotelRepository.findByNameContainingIgnoreCaseOrLocationContainingIgnoreCase(keyword, keyword);
    }

    @Override
    public Hotel saveHotel(Hotel hotel) {
        return null;
    }


}

