package com.ibm.appointment.online_booking.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ibm.appointment.online_booking.dto.LoginRequestDTO;
import com.ibm.appointment.online_booking.entity.User;
import com.ibm.appointment.online_booking.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
	
	


	    @Autowired
	    private UserRepository userRepository;

	    @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request){

	        Optional<User
	        > userOptional = userRepository.findByEmail(request.getEmail());

	        if(userOptional.isEmpty()){
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
	        }

	        User user = userOptional.get();

	        if(!user.getPassword().equals(request.getPassword())){
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
	        }

	        return ResponseEntity.ok(user);
	    }

	

}
