package com.smart_tour.smart_tour_management_system.service;

import com.smart_tour.smart_tour_management_system.model.Book;
import com.smart_tour.smart_tour_management_system.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book saveBook(Book book) {
        // Kama tourDate haijawekwa kwenye fomu, tunaweka tarehe ya leo
        if (book.getTourDate() == null || book.getTourDate().trim().isEmpty()) {
            book.setTourDate(java.time.LocalDate.now().toString());
        }
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}