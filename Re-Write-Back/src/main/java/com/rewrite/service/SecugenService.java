package com.rewrite.service;

import java.io.IOException;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import com.rewrite.entity.Volunteer;
import com.rewrite.repository.VolunteerRepository;
import com.rewrite.request.MatchFingerPrintRequest;
import com.rewrite.response.FingerPrintResponse;
import com.rewrite.response.MatchFingerPrintResponse;
import com.rewrite.response.VolunteerInfo;
import com.rewrite.response.VolunteerResponse;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

@Service
public class SecugenService {

	@Autowired
	VolunteerRepository volunteerRepository;
	public String getFingerPrint(HttpHeaders header) {
		
		VolunteerResponse volunteerResponse = new VolunteerResponse();
		FingerPrintResponse fingerPrintResponse = null;
		String body = "{\r\n    \"Timeout\":10000,\r\n    \"Quality\":1,\r\n    \"licstr\": \"\",\r\n    \"templateFormat\":\"ISO\"\r\n}";
		HttpResponse<String> response = Unirest.post("https://localhost:8443/SGIFPCapture")
				.header("Host", " localhost:8443").header("Origin", "http://localhost:8080").body(body).asString();

		System.out.println(response.getBody());
		ObjectMapper mapper = new ObjectMapper();
		try {
			fingerPrintResponse = mapper.readValue(response.getBody(), FingerPrintResponse.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		volunteerResponse.setFingerPrintInfo(fingerPrintResponse);
		List<Volunteer> volunteers = volunteerRepository.findAll();
		boolean isMatch= false;
		
		for(Volunteer volunteer : volunteers) {
			isMatch =matchFingerPrint(volunteer.getFingerPrint(),fingerPrintResponse.getBMPBase64());
			if(isMatch) {
				VolunteerInfo volunteerInfo = new VolunteerInfo();
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
				//volunteerInfo.setFingerPrintImage();
				//volunteerInfo.setVolunteerImage(volunteerImage);
				break;
			}
		}
		return response.getBody();
	}

	public boolean matchFingerPrint(String userFingerPrint, String dbFingerPrint) {
		String matchFingerPrintRequest = null;
		MatchFingerPrintResponse matchFingerPrintResponse = null;
		MatchFingerPrintRequest fingerPrintRequest = new MatchFingerPrintRequest();
		fingerPrintRequest.setLicstr("");
		fingerPrintRequest.setTemplate1(userFingerPrint);
		fingerPrintRequest.setTemplate2(dbFingerPrint);
		fingerPrintRequest.setTemplateFormat("ISO");
        ObjectMapper mapper = new ObjectMapper();
        
        try {
       
            matchFingerPrintRequest = mapper.writeValueAsString(fingerPrintRequest);
            System.out.println(matchFingerPrintRequest);
            
            
        } catch (JsonGenerationException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
		
		HttpResponse<String> response = Unirest.post("https://localhost:8443/SGIFPCapture")
				.header("Host", " localhost:8443").header("Origin", "http://localhost:8080").body(matchFingerPrintRequest).asString();

		System.out.println(response.getBody());
		
		ObjectMapper matchFingerPrintResponseMapper = new ObjectMapper();
		try {
			matchFingerPrintResponse = matchFingerPrintResponseMapper.readValue(response.getBody(), MatchFingerPrintResponse.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(matchFingerPrintResponse.getMatchingScore() >= 100) {
			return true;
		}else {
			return false;
		}
		
		

	}

}
