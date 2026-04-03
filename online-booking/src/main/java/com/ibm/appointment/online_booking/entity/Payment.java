package com.ibm.appointment.online_booking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ✅ FIX HERE */
    @ManyToOne
    @JoinColumn(name = "booking_id")
    @JsonIgnore   // 🔥 VERY IMPORTANT (prevents circular JSON)
    private Booking booking;

    private double amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }
}