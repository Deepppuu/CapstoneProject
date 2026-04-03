package com.ibm.appointment.online_booking.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(
	    uniqueConstraints = @UniqueConstraint(
	        columnNames = {"date","time","service_id"}
	    )
	)
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime time;

    @Column(nullable = false)
    private boolean booked = false;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private ServiceEntity service;

    public Slot() {}

    public Slot(Long id, LocalDate date, LocalTime time, boolean booked, ServiceEntity service) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.booked = booked;
        this.service = service;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getTime() {
        return time;
    }

    public boolean isBooked() {
        return booked;
    }

    public ServiceEntity getService() {
        return service;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public void setBooked(boolean booked) {
        this.booked = booked;
    }

    public void setService(ServiceEntity service) {
        this.service = service;
    }
}