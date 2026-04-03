package com.ibm.appointment.online_booking.service;

import com.ibm.appointment.online_booking.entity.*;
import com.ibm.appointment.online_booking.repository.BookingRepository;
import com.ibm.appointment.online_booking.repository.SlotRepository;
import com.ibm.appointment.online_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private UserRepository userRepository;


    // ✅ Book Slot
    public Booking bookSlot(Long userId, Long slotId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Slot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        // Check if slot already booked
        if (slot.isBooked()) {
            throw new RuntimeException("Slot already booked");
        }

        // Check if booking already exists for slot
        if (bookingRepository.findBySlot(slot).isPresent()) {
            throw new RuntimeException("Slot already booked by another user");
        }

        // Mark slot booked
        slot.setBooked(true);
        slotRepository.save(slot);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setSlot(slot);
        booking.setStatus(BookingStatus.BOOKED);
        booking.setCreatedTime(LocalDateTime.now());

        try {

            return bookingRepository.save(booking);

        } catch (Exception e) {

            // Handle DB unique constraint error
            throw new RuntimeException("Slot already booked");

        }
    }


    // ✅ Cancel Booking
    public Booking cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Slot slot = booking.getSlot();

        slot.setBooked(false);
        slotRepository.save(slot);

        booking.setStatus(BookingStatus.CANCELLED);

        return bookingRepository.save(booking);
    }


    // ✅ Reschedule Booking
    public Booking rescheduleBooking(Long bookingId, Long newSlotId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Slot oldSlot = booking.getSlot();

        Slot newSlot = slotRepository.findById(newSlotId)
                .orElseThrow(() -> new RuntimeException("New slot not found"));

        if (newSlot.isBooked()) {
            throw new RuntimeException("New slot already booked");
        }

        // Free old slot
        oldSlot.setBooked(false);
        slotRepository.save(oldSlot);

        // Book new slot
        newSlot.setBooked(true);
        slotRepository.save(newSlot);

        booking.setSlot(newSlot);
        booking.setStatus(BookingStatus.RESCHEDULED);
        booking.setCreatedTime(LocalDateTime.now());

        return bookingRepository.save(booking);
    }


    // ✅ Get all bookings
    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();
    }


    // ✅ Get bookings by user
    public List<Booking> getBookingsByUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByUser(user);
    }


    // ✅ Get booking by ID
    public Booking getBookingById(Long id) {

        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
}