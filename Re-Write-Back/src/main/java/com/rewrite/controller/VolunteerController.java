package com.rewrite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.rewrite.entity.Volunteer;
import com.rewrite.request.FingerPrintRequest;
import com.rewrite.request.VolunteerRequest;
import com.rewrite.response.FingerPrintResponse;
import com.rewrite.response.RewriteResponse;
import com.rewrite.response.VolunteerResponse;
import com.rewrite.service.VolunteerService;

@RestController
@CrossOrigin("*")
public class VolunteerController {

	@Autowired
	VolunteerService volunteerService;
	
	@PostMapping(value = "/api/v1/add-volunteer")
	public RewriteResponse addVolunteer(@RequestBody VolunteerRequest volunteer, @RequestHeader HttpHeaders header) {
		volunteerService.addVolunteer(volunteer);
		return new RewriteResponse("Volunteer added successfully", "200");
	}
	
	@PutMapping(value = "/api/v1/update-volunteer")
	public RewriteResponse updateVolunteer(@RequestBody VolunteerRequest volunteer, @RequestHeader HttpHeaders header) {
		volunteerService.updateVolunteer(volunteer);
		return new RewriteResponse("Volunteer updated successfully", "200");
	}
	
	@PutMapping(value = "/api/v1/delete-volunteer")
	public RewriteResponse deleteVolunteer(@RequestBody VolunteerRequest volunteer, @RequestHeader HttpHeaders header) {
		volunteerService.deleteVolunteer(volunteer);
		return new RewriteResponse("Volunteer deleted successfully", "200");
	}
	
	@GetMapping(value = "/api/v1/get-volunteer/{id}")
	public VolunteerResponse getVolunteer(@PathVariable("id") String volId) {
		
			return volunteerService.getVolunteer(volId);
	}

	@GetMapping(value = "/api/v1/get-all-volunteer")
	public List<Volunteer> getAllVolunteer(@RequestHeader HttpHeaders header) {
		
			return volunteerService.getAllVolunteer();
	}
	
	@PostMapping(value = "/api/v1/match-fingerprint")
	public String addFingerPrint(@RequestBody FingerPrintRequest requestBody, @RequestHeader HttpHeaders header) {		
		String response = volunteerService.getFingerPrint(header,requestBody);
		 return response;
	}

}
