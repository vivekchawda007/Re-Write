package com.rewrite.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rewrite.entity.Volunteer;
import com.rewrite.repository.VolunteerRepository;
import com.rewrite.request.VolunteerRequest;

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
		List<Volunteer> vollst =  volunteerRepo.findAll();
		return vollst;
	}


}
