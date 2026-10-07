package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.HomeHero;
import com.smart_tour.smart_tour_management_system.repository.HomeHeroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeHeroServiceImpl implements HomeHeroService {

    private final HomeHeroRepository homeHeroRepository;

    public HomeHeroServiceImpl(HomeHeroRepository homeHeroRepository) {
        this.homeHeroRepository = homeHeroRepository;
    }

    @Override
    public HomeHero getHeroContent() {
        List<HomeHero> list = homeHeroRepository.findAll();
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public HomeHero updateHeroContent(HomeHero hero) {
        return homeHeroRepository.save(hero);
    }

    @Override
    public List<HomeHero> getAllHomeHeroes() {
        return homeHeroRepository.findAll();
    }

    @Override
    public HomeHero getHomeHeroById(Long id) {
        return homeHeroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HomeHero haijapatikana na id: " + id));
    }

    @Override
    public HomeHero saveHomeHero(HomeHero homeHero) {
        return homeHeroRepository.save(homeHero);
    }
}