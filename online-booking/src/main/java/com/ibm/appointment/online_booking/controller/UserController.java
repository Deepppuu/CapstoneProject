package com.ibm.appointment.online_booking.controller;

import com.ibm.appointment.online_booking.dto.ApiResponse;
import com.ibm.appointment.online_booking.entity.User;
import com.ibm.appointment.online_booking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ApiResponse<User> createUser(@Valid @RequestBody User user) {
        User savedUser = userService.createUser(user);
        return new ApiResponse<>("SUCCESS", "User created successfully", savedUser);
    }

    @GetMapping
    public ApiResponse<List<User>> getAllUsers() {
        return new ApiResponse<>("SUCCESS", "All users retrieved", userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ApiResponse<User> getUserById(@PathVariable Long id) {
        return new ApiResponse<>("SUCCESS", "User retrieved", userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ApiResponse<User> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails) {
        return new ApiResponse<>("SUCCESS", "User updated successfully", userService.updateUser(id, userDetails));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ApiResponse<>("SUCCESS", "User deleted successfully", null);
    }
}