package com.ibm.appointment.online_booking.controller;

import com.ibm.appointment.online_booking.dto.ApiResponse;
import com.ibm.appointment.online_booking.entity.Payment;
import com.ibm.appointment.online_booking.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/pay")
    public ApiResponse<Payment> makePayment(@RequestParam Long bookingId, @RequestParam double amount) {
        return new ApiResponse<>("SUCCESS", "Payment processed successfully", paymentService.makePayment(bookingId, amount));
    }

    @GetMapping("/{id}")
    public ApiResponse<Payment> getPaymentById(@PathVariable Long id) {
        return new ApiResponse<>("SUCCESS", "Payment retrieved", paymentService.getPaymentById(id));
    }

    @GetMapping("/booking/{bookingId}")
    public ApiResponse<Payment> getPaymentByBooking(@PathVariable Long bookingId) {
        return new ApiResponse<>("SUCCESS", "Payment retrieved for booking", paymentService.getPaymentByBooking(bookingId));
    }

    @GetMapping
    public ApiResponse<List<Payment>> getAllPayments() {
        return new ApiResponse<>("SUCCESS", "All payments retrieved", paymentService.getAllPayments());
    }
}