package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.Hotel;
import java.util.List;

public interface HotelService {
    List<Hotel> getAllHotels();

    Hotel getHotelById(Long id);

    List<Hotel> searchHotels(String keyword);

    Hotel saveHotel(Hotel hotel);

}

