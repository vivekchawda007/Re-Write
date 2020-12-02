package com.rewrite.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.rewrite.entity.Volunteer;
import com.rewrite.repository.VolunteerRepository;
import com.rewrite.request.MatchFingerPrintRequest;
import com.rewrite.request.VolunteerRequest;
import com.rewrite.response.FingerPrintResponse;
import com.rewrite.response.MatchFingerPrintResponse;
import com.rewrite.response.VolunteerInfo;
import com.rewrite.response.VolunteerResponse;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

@Service
public class VolunteerService {

	@Autowired
	VolunteerRepository volunteerRepo;

	public void addVolunteer(VolunteerRequest volunteerReq) {
		Volunteer volunteer = new Volunteer();
		volunteer.setId(UUID.randomUUID().toString());
		volunteer.setFirstName(volunteerReq.getFirstName());
		volunteer.setLastName(volunteerReq.getLastName());
		volunteer.setMobileNumber(volunteerReq.getMobileNumber());
		volunteer.setAddress(volunteerReq.getAddress());
		volunteer.setManufacturer(volunteerReq.getManufacturer());
		volunteer.setModel(volunteerReq.getModel());
		volunteer.setSerialNumber(volunteerReq.getSerialNumber());
		volunteer.setFingerPrint(volunteerReq.getFingerPrint());
		volunteer.setCreatedBy(volunteerReq.getCreatedBy());
		volunteer.setEndDate(volunteerReq.getEndDate());
		volunteer.setCreatedDate(new Date());
		volunteer.setModifiedDate(new Date());
		volunteer.setActive(Boolean.TRUE);
		volunteer.setDelete(Boolean.FALSE);
		volunteerRepo.save(volunteer);
	}

	public List<Volunteer> get(String fingerPrint) {
		List<Volunteer> vollst = volunteerRepo.findAll();
		return vollst;
	}

	public String getFingerPrint(HttpHeaders header) {
		VolunteerInfo volunteerInfo = new VolunteerInfo();
		VolunteerResponse volunteerResponse = new VolunteerResponse();
		FingerPrintResponse fingerPrintResponse = null;
		String body = "{\r\n    \"Timeout\":10000,\r\n    \"Quality\":1,\r\n    \"licstr\": \"\",\r\n    \"templateFormat\":\"ISO\"\r\n}";

		HttpResponse<String> response = Unirest.post("https://localhost:8443/SGIFPCapture")
				.header("Host", " localhost:8443").header("Origin", "http://localhost:8080").body(body).asString();

		System.out.println(response.getBody());

		Gson gson = new GsonBuilder().create();
		fingerPrintResponse = gson.fromJson(response.getBody(), FingerPrintResponse.class);

		volunteerResponse.setFingerPrintInfo(fingerPrintResponse);
		List<Volunteer> volunteers = volunteerRepo.findAll();
		boolean isMatch = false;

		for (Volunteer volunteer : volunteers) {
			isMatch = matchFingerPrint( fingerPrintResponse.getTemplateBase64(),volunteer.getFingerPrint());
			if (isMatch) {
				
				volunteerInfo.setAddress(volunteer.getAddress());
				volunteerInfo.setCreatedBy(volunteer.getCreatedBy());
				volunteerInfo.setEndDate(volunteer.getEndDate());
				volunteerInfo.setFingerPrint(volunteer.getFingerPrint());
				volunteerInfo.setFirstName(volunteer.getFirstName());
				volunteerInfo.setLastName(volunteer.getLastName());
				volunteerInfo.setManufacturer(volunteer.getManufacturer());
				volunteerInfo.setMobileNumber(volunteer.getMobileNumber());
				volunteerInfo.setModel(volunteer.getModel());
				volunteerInfo.setSerialNumber(volunteer.getSerialNumber());
				volunteerInfo.setIsNew(Boolean.FALSE);
				volunteerResponse.setVolunteerInfo(volunteerInfo);
				
				// volunteerInfo.setFingerPrintImage();
				// volunteerInfo.setVolunteerImage(volunteerImage);
				break;
			}
		}
		if(!isMatch) {
			volunteerInfo.setIsNew(Boolean.TRUE);
			volunteerResponse.setVolunteerInfo(volunteerInfo);
		}
		Gson gsonResponse = new Gson();
		String finalVolunteerResponse = gsonResponse.toJson(volunteerResponse);
		return finalVolunteerResponse;
	}

	public boolean matchFingerPrint(String userFingerPrint, String dbFingerPrint) {

		MatchFingerPrintResponse matchFingerPrintResponse = null;

		
		HttpResponse<String> response = Unirest.post("https://localhost:8443/SGIMatchScore")
				.header("Host", " localhost:8443").header("Origin", "http://localhost:8080")
				.header("Origin", "http://localhost:8080")
				.field("template1", userFingerPrint)
				.field("template2", dbFingerPrint)
				.field("licstr", "")
				.field("templateFormat", "ISO")				
				.asString();
				

		System.out.println(response.getBody());
		Gson gson2 = new GsonBuilder().create();
		matchFingerPrintResponse = gson2.fromJson(response.getBody(), MatchFingerPrintResponse.class);
		
		if (matchFingerPrintResponse.getMatchingScore() >= 100) {
			return true;
		} else {
			return false;
		}

	}

}
