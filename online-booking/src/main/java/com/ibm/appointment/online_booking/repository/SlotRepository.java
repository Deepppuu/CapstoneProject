package com.ibm.appointment.online_booking.repository;

import com.ibm.appointment.online_booking.entity.Slot;

import com.ibm.appointment.online_booking.entity.ServiceEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface SlotRepository extends JpaRepository<Slot, Long> {

    // ✅ Get all slots for a service
    List<Slot> findByService(ServiceEntity service);

    // ✅ Get available slots
    List<Slot> findByBookedFalse();

    // ✅ Check slot existence (important for duplicate prevention)
    Optional<Slot> findByDateAndTime(LocalDate date, LocalTime time);
    
    boolean existsByDate(LocalDate date);
    
    boolean existsByDateAndService(LocalDate date, ServiceEntity service);
    
    
}