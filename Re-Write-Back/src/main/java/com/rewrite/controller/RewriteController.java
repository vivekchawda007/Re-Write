package com.rewrite.controller;

import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.rewrite.entity.UserDetail;
import com.rewrite.request.UserRequest;
import com.rewrite.request.VolunteerRequest;
import com.rewrite.response.RewriteResponse;
import com.rewrite.rest.RestClient;
import com.rewrite.service.SecugenService;
import com.rewrite.service.UserDetailService;
import com.rewrite.service.VolunteerService;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

@RestController
@CrossOrigin("*")
public class RewriteController {

	@Autowired
	UserDetailService userService;

	@Autowired
	VolunteerService volunteerService;
	
	@Autowired
	SecugenService secugenService;

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
		SecugenService secugenService = new SecugenService();
		String response = secugenService.getFingerPrint(header);
		 return response;

	}

}
