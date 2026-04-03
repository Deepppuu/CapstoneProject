package com.ibm.appointment.online_booking.repository;

import com.ibm.appointment.online_booking.entity.Booking;
import com.ibm.appointment.online_booking.entity.Slot;
import com.ibm.appointment.online_booking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // ✅ Find booking by slot (used to prevent double booking)
    Optional<Booking> findBySlot(Slot slot);

    // ✅ Get all bookings of a user
    List<Booking> findByUser(User user);
}