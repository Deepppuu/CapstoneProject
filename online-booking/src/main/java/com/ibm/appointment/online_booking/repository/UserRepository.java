package com.ibm.appointment.online_booking.repository;

import com.ibm.appointment.online_booking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email); // ✅ login use case
}