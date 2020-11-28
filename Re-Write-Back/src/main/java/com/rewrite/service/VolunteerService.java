package com.rewrite.service;

import java.util.Date;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rewrite.Request.Volunteer;
import com.rewrite.entity.VolunteerDetail;
import com.rewrite.repository.VolunteerRepository;

@Service
public class VolunteerService {

	@Autowired
	VolunteerRepository volunteerRepo;

	public void addVolunteer(Volunteer volunteer) {
		VolunteerDetail volunteerDetail = new VolunteerDetail();
		volunteerDetail.setId(UUID.randomUUID().toString());
		volunteerDetail.setFirstName(volunteer.getFirstName());
		volunteerDetail.setLastName(volunteer.getLastName());
		volunteerDetail.setMobileNumber(volunteer.getMobileNumber());
		volunteerDetail.setFingerPrint(volunteer.getFingerPrint());
		volunteerDetail.setCreatedBy(volunteer.getCreatedBy());
		volunteerDetail.setEndDate(volunteer.getEndDate());
		volunteerDetail.setCreatedDate(new Date());
		volunteerDetail.setModifiedDate(new Date());
		volunteerDetail.setActive(Boolean.TRUE);
		volunteerDetail.setDelete(Boolean.FALSE);
		volunteerRepo.save(volunteerDetail);
	}


}
