package com.smart_tour.smart_tour_management_system.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String tourDate;

    @Column(nullable = false)
    private Integer numberOfTourists;

    @Column(nullable = false)
    private String paymentMethod;

    public Book() {
    }

    public Book(String fullName, String email, String tourDate, Integer numberOfTourists, String paymentMethod) {
        this.fullName = fullName;
        this.email = email;
        this.tourDate = tourDate;
        this.numberOfTourists = numberOfTourists;
        this.paymentMethod = paymentMethod;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTourDate() {
        return tourDate;
    }

    public void setTourDate(String tourDate) {
        this.tourDate = tourDate;
    }

    public Integer getNumberOfTourists() {
        return numberOfTourists;
    }

    public void setNumberOfTourists(Integer numberOfTourists) {
        this.numberOfTourists = numberOfTourists;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}