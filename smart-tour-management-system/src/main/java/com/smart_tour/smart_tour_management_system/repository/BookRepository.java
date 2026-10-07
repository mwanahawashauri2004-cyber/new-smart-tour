package com.smart_tour.smart_tour_management_system.repository;

import com.smart_tour.smart_tour_management_system.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}

