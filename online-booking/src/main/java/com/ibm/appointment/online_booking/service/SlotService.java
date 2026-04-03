package com.ibm.appointment.online_booking.service;

import com.ibm.appointment.online_booking.entity.ServiceEntity;
import com.ibm.appointment.online_booking.entity.Slot;
import com.ibm.appointment.online_booking.repository.SlotRepository;
import com.ibm.appointment.online_booking.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SlotService {

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    // ✅ Create slot with duplicate check
    public Slot createSlot(Long serviceId, Slot slot) {
        ServiceEntity service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        slot.setService(service);

        slotRepository.findByDateAndTime(slot.getDate(), slot.getTime())
                .ifPresent(s -> { throw new RuntimeException("Slot for this date & time already exists"); });

        return slotRepository.save(slot);
    }

    public List<Slot> getAllSlots() {
        return slotRepository.findAll();
    }

    public List<Slot> getAvailableSlots() {
        return slotRepository.findByBookedFalse();
    }

    public Slot getSlotById(Long id) {
        return slotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot not found"));
    }
}