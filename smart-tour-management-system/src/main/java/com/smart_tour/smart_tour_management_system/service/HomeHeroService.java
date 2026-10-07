package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.HomeHero;
import java.util.List;
public interface HomeHeroService {
    HomeHero getHeroContent();

    HomeHero updateHeroContent(HomeHero hero); // Line hii ndiyo inayotatua error ya controller!

    List<HomeHero> getAllHomeHeroes();

    HomeHero getHomeHeroById(Long id);

    HomeHero saveHomeHero(HomeHero homeHero);

    public interface homeHeroService {
        List<HomeHero> getAllHomeHeroes();

        HomeHero getHomeHeroById(Long id);

        HomeHero saveHomeHero(HomeHero homeHero);

        HomeHero getHeroContent();
    }
}