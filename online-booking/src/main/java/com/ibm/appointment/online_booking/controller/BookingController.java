package com.ibm.appointment.online_booking.controller;

import com.ibm.appointment.online_booking.dto.ApiResponse;
import com.ibm.appointment.online_booking.entity.Booking;
import com.ibm.appointment.online_booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public ApiResponse<?> bookSlot(@RequestParam Long userId, @RequestParam Long slotId) {

        try {

            Booking booking = bookingService.bookSlot(userId, slotId);

            return new ApiResponse<>("SUCCESS", "Slot booked successfully", booking);

        } catch (RuntimeException e) {

            return new ApiResponse<>("FAILED", e.getMessage(), null);

        }
    }

    @PutMapping("/cancel/{bookingId}")
    public ApiResponse<Booking> cancelBooking(@PathVariable Long bookingId) {
        return new ApiResponse<>("SUCCESS", "Booking cancelled successfully", bookingService.cancelBooking(bookingId));
    }

    @PutMapping("/reschedule")
    public ApiResponse<Booking> rescheduleBooking(@RequestParam Long bookingId, @RequestParam Long newSlotId) {
        return new ApiResponse<>("SUCCESS", "Booking rescheduled successfully", bookingService.rescheduleBooking(bookingId, newSlotId));
    }

    @GetMapping
    public ApiResponse<List<Booking>> getAllBookings() {
        return new ApiResponse<>("SUCCESS", "All bookings retrieved", bookingService.getAllBookings());
    }

    @GetMapping("/{id}")
    public ApiResponse<Booking> getBookingById(@PathVariable Long id) {
        return new ApiResponse<>("SUCCESS", "Booking retrieved", bookingService.getBookingById(id));
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<Booking>> getBookingsByUser(@PathVariable Long userId) {
        return new ApiResponse<>("SUCCESS", "User bookings retrieved", bookingService.getBookingsByUser(userId));
    }
}