package com.rewrite.controller;

import org.apache.catalina.Context;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.rewrite.Request.User;
import com.rewrite.Request.Volunteer;
import com.rewrite.Response.RewriteResponse;
import com.rewrite.entity.UserDetail;
import com.rewrite.rest.RestClient;
import com.rewrite.service.SecugenService;
import com.rewrite.service.UserDetailService;
import com.rewrite.service.VolunteerService;

import SecuGen.FDxSDKPro.jni.JSGFPLib;
import SecuGen.FDxSDKPro.jni.SGDeviceInfoParam;
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
	public RewriteResponse addUser(@RequestBody User user) {
		userService.addUser(user);
		return new RewriteResponse("user added successfully", "200");
	}
	
	@PostMapping(value = "/api/v1/validate-user")
	public UserDetail validateUser(@RequestBody User user) {
		return userService.validateUser(user).get(0);
	}

	@PostMapping(value = "/api/v1/add-volunteer")
	public RewriteResponse addVolunteer(@RequestBody Volunteer volunteer,@RequestHeader HttpHeaders header) {
		volunteerService.addVolunteer(volunteer);
		return new RewriteResponse("Volunteer added successfully", "200");
	}
	
	@GetMapping(value = "/api/v1/get-fingerprint")
	public ResponseEntity<Object> addFingerPrint(@RequestHeader HttpHeaders header) {
		SecugenService secugenService = new SecugenService();
		
		return secugenService.getFingerPrint(header);
		
	}
	
}
