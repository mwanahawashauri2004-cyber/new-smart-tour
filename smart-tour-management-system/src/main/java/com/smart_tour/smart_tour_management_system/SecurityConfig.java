package com.smart_tour.smart_tour_management_system;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Zima CSRF kwa sababu tunatumia REST APIs
                .csrf(csrf -> csrf.disable())

                // 2. Weka CORS Configuration
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 3. Ruhusu njia (endpoints) zote za public bila kuhitaji Token au Login
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/book/**").permitAll()
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/tours/**").permitAll()
                        .requestMatchers("/api/v1/hotels/**").permitAll()
                        .requestMatchers("/api/v1/experiences/**").permitAll()
                        .requestMatchers("/api/v1/contact/**").permitAll()
                        .anyRequest().permitAll() // Hii inaruhusu maombi yote kwa ajili ya testing
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Ruhusu Frontend kutoka React (Port 5173 na 3000)
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
