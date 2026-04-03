package com.ibm.appointment.online_booking.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "slot_id", unique = true)
    private Slot slot;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;

    private LocalDateTime createdTime = LocalDateTime.now();

    @OneToMany(mappedBy = "booking")
    private List<Payment> payments;

    public Booking() {}

    public Booking(Long id, User user, Slot slot, BookingStatus status, LocalDateTime createdTime) {
        this.id = id;
        this.user = user;
        this.slot = slot;
        this.status = status;
        this.createdTime = createdTime;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Slot getSlot() {
        return slot;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public List<Payment> getPayments() {
        return payments;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setSlot(Slot slot) {
        this.slot = slot;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }
}