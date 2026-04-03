package com.ibm.appointment.online_booking.service;

import com.ibm.appointment.online_booking.entity.Booking;
import com.ibm.appointment.online_booking.entity.Payment;
import com.ibm.appointment.online_booking.entity.PaymentStatus;
import com.ibm.appointment.online_booking.repository.BookingRepository;
import com.ibm.appointment.online_booking.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // ✅ Make payment by booking ID
    public Payment makePayment(Long bookingId, double amount) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(amount);
        payment.setStatus(PaymentStatus.PAID);

        return paymentRepository.save(payment);
    }

    // ✅ Get payment by ID
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    // ✅ Get all payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // ✅ Get payment by booking
    public Payment getPaymentByBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return paymentRepository.findByBooking(booking)
                .orElseThrow(() -> new RuntimeException("Payment not found for this booking"));
    }
}