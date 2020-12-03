package com.rewrite.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.rewrite.entity.UserDetail;
import com.rewrite.entity.Volunteer;
import com.rewrite.request.UserRequest;
import com.rewrite.request.VolunteerRequest;
import com.rewrite.response.RewriteResponse;
import com.rewrite.response.VolunteerInfo;
import com.rewrite.response.VolunteerResponse;
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
	public String addVolunteer(@RequestBody VolunteerRequest volunteer, @RequestHeader HttpHeaders header) {
		String volunteerResponse = volunteerService.addVolunteer(volunteer);
		return volunteerResponse;
	}
	
	@GetMapping(value = "/api/v1/get-volunteer/{id}")
	public VolunteerResponse getVolunteer(@PathVariable("id") String volId) {
		
			return volunteerService.getVolunteer(volId);
	}

	@GetMapping(value = "/api/v1/get-all-volunteer")
	public List<Volunteer> getAllVolunteer(@RequestHeader HttpHeaders header) {
		
			return volunteerService.getAllVolunteer();
	}
	
	@GetMapping(value = "/api/v1/get-fingerprint")
	public String addFingerPrint(@RequestHeader HttpHeaders header) {
		String response = volunteerService.getFingerPrint(header);
		 return response;
	}

}
