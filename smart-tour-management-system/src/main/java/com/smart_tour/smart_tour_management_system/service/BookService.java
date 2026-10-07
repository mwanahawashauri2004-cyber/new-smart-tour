package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.Book;

import java.time.LocalDate;
import java.util.List;

public interface BookService {
    Book saveBook(Book book);
    List<Book> getAllBooks();
}
