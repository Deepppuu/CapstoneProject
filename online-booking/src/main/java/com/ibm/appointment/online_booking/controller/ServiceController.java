package com.ibm.appointment.online_booking.controller;

import com.ibm.appointment.online_booking.dto.ApiResponse;
import com.ibm.appointment.online_booking.entity.ServiceEntity;
import com.ibm.appointment.online_booking.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @PostMapping
    public ApiResponse<ServiceEntity> createService(@RequestBody ServiceEntity service) {
        return new ApiResponse<>("SUCCESS", "Service created successfully", serviceService.createService(service));
    }

    @GetMapping
    public ApiResponse<List<ServiceEntity>> getAllServices() {
        return new ApiResponse<>("SUCCESS", "All services retrieved", serviceService.getAllServices());
    }

    @GetMapping("/{id}")
    public ApiResponse<ServiceEntity> getServiceById(@PathVariable Long id) {
        return new ApiResponse<>("SUCCESS", "Service retrieved", serviceService.getServiceById(id));
    }
}