package com.ibm.appointment.online_booking.controller;

import com.ibm.appointment.online_booking.dto.ApiResponse;
import com.ibm.appointment.online_booking.entity.Slot;
import com.ibm.appointment.online_booking.service.SlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class SlotController {

    @Autowired
    private SlotService slotService;

    @PostMapping("/service/{serviceId}")
    public ApiResponse<Slot> createSlot(@PathVariable Long serviceId, @RequestBody Slot slot) {
        return new ApiResponse<>("SUCCESS", "Slot created successfully", slotService.createSlot(serviceId, slot));
    }

    @GetMapping
    public ApiResponse<List<Slot>> getAllSlots() {
        return new ApiResponse<>("SUCCESS", "All slots retrieved", slotService.getAllSlots());
    }

    @GetMapping("/available")
    public ApiResponse<List<Slot>> getAvailableSlots() {
        return new ApiResponse<>("SUCCESS", "Available slots retrieved", slotService.getAvailableSlots());
    }

    @GetMapping("/{id}")
    public ApiResponse<Slot> getSlotById(@PathVariable Long id) {
        return new ApiResponse<>("SUCCESS", "Slot retrieved", slotService.getSlotById(id));
    }
}