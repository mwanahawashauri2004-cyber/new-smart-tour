package com.smart_tour.smart_tour_management_system.controller;

import com.smart_tour.smart_tour_management_system.model.HomeHero;
import com.smart_tour.smart_tour_management_system.service.HomeHeroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/home")
@CrossOrigin(origins = " http://localhost:5173/")
public class HomeHeroController {

    @Autowired
    private HomeHeroService homeHeroService;

    // GET /api/v1/home/hero
    @GetMapping("/hero")
    public HomeHero getHeroContent() {
        return homeHeroService.getHeroContent();
    }

    // POST /api/v1/home/hero (Kwa ajili ya Admin kuedit/kuset content za Home Hero)
    @PostMapping("/hero")
    public HomeHero updateHeroContent(@RequestBody HomeHero hero) {
        return homeHeroService.updateHeroContent(hero);
    }
}

