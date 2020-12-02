package com.rewrite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.rewrite.entity.UserDetail;
import com.rewrite.request.UserRequest;
import com.rewrite.request.VolunteerRequest;
import com.rewrite.response.RewriteResponse;
import com.rewrite.rest.RestClient;
import com.rewrite.service.UserDetailService;
import com.rewrite.service.VolunteerService;

@RestController
@CrossOrigin("*")
public class RewriteController {

	@Autowired
	UserDetailService userService;

	@Autowired
	VolunteerService volunteerService;
	

	@Autowired
	RestClient restClient;

	@GetMapping("/getUSer")
	public String getUser() {
		return "abc";
	}

	@PostMapping(value = "/api/v1/add-user")
	public RewriteResponse addUser(@RequestBody UserRequest user) {
		userService.addUser(user);
		return new RewriteResponse("user added successfully", "200");
	}

	@PostMapping(value = "/api/v1/validate-user")
	public UserDetail validateUser(@RequestBody UserRequest user) {
		return userService.validateUser(user).get(0);
	}

	@PostMapping(value = "/api/v1/add-volunteer")
	public RewriteResponse addVolunteer(@RequestBody VolunteerRequest volunteer, @RequestHeader HttpHeaders header) {
		volunteerService.addVolunteer(volunteer);
		return new RewriteResponse("Volunteer added successfully", "200");
	}

	@GetMapping(value = "/api/v1/get-fingerprint")
	public String addFingerPrint(@RequestHeader HttpHeaders header) {
		String response = volunteerService.getFingerPrint(header);
		 return response;

	}

}
