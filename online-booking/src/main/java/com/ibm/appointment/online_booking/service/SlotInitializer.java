package com.ibm.appointment.online_booking.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ibm.appointment.online_booking.entity.ServiceEntity;
import com.ibm.appointment.online_booking.entity.Slot;
import com.ibm.appointment.online_booking.repository.ServiceRepository;
import com.ibm.appointment.online_booking.repository.SlotRepository;

import jakarta.annotation.PostConstruct;

@Component
public class SlotInitializer {

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @PostConstruct
    public void createTodaySlots() {

        LocalDate today = LocalDate.now();

        // Get all services
        List<ServiceEntity> services = serviceRepository.findAll();

        // Slot times
        List<LocalTime> times = List.of(
                LocalTime.of(9,0),
                LocalTime.of(10,0),
                LocalTime.of(11,0),
                LocalTime.of(12,0),
                LocalTime.of(14,0),
                LocalTime.of(15,0),
                LocalTime.of(16,0),
                LocalTime.of(17,0)
        );

        for(ServiceEntity service : services){

            // Check if slots already exist for this service today
            if(slotRepository.existsByDateAndService(today, service)){
                continue;
            }

            for(LocalTime time : times){

                Slot slot = new Slot();

                slot.setDate(today);
                slot.setTime(time);
                slot.setBooked(false);
                slot.setService(service);

                slotRepository.save(slot);

            }

        }

        System.out.println("Slots created for all services for date: " + today);

    }
}