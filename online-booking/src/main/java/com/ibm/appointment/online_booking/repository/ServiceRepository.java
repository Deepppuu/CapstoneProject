package com.ibm.appointment.online_booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ibm.appointment.online_booking.entity.ServiceEntity;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
}