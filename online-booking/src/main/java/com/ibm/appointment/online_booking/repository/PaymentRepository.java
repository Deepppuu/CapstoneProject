package com.ibm.appointment.online_booking.repository;

import com.ibm.appointment.online_booking.entity.Payment;
import com.ibm.appointment.online_booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // ✅ Get payment by booking
    Optional<Payment> findByBooking(Booking booking);
}