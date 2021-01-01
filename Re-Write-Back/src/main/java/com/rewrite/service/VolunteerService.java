package com.rewrite.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.rewrite.entity.Volunteer;
import com.rewrite.entity.VolunteerBlockDetail;
import com.rewrite.entity.VolunteerDetail;
import com.rewrite.repository.VolunteerBlockDetailRepository;
import com.rewrite.repository.VolunteerDetailRepository;
import com.rewrite.repository.VolunteerRepository;
import com.rewrite.request.FingerPrintRequest;
import com.rewrite.request.VolunteerRequest;
import com.rewrite.response.MatchFingerPrintResponse;
import com.rewrite.response.VolunteerInfo;
import com.rewrite.response.VolunteerResponse;

import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

@Service
public class VolunteerService {

	@Autowired
	VolunteerRepository volunteerRepo;

	@Autowired
	VolunteerDetailRepository volunteerDetailRepo;

	@Autowired
	VolunteerBlockDetailRepository volunteerBlockDetailRepo;

	@Autowired
	AuditService auditService;

	public void addVolunteer(VolunteerRequest volunteerReq) {
		Volunteer volunteer = new Volunteer();
		VolunteerDetail detail = new VolunteerDetail();
		/* volunteer.setId(UUID.randomUUID().toString()); */
		volunteer.setFirstName(volunteerReq.getFirstName());
		volunteer.setLastName(volunteerReq.getLastName());
		volunteer.setMobileNumber(volunteerReq.getMobileNumber());
		volunteer.setAddress(volunteerReq.getAddress());
		volunteer.setManufacturer(volunteerReq.getManufacturer());
		volunteer.setModel(volunteerReq.getModel());
		volunteer.setSerialNumber(volunteerReq.getSerialNumber());
		volunteer.setFingerPrint(volunteerReq.getFingerPrint());
		volunteer.setCreatedBy(volunteerReq.getCreatedBy());
		volunteer.setIsBlocked(Boolean.FALSE);
		volunteer.setCreatedDate(new Date());
		volunteer.setModifiedDate(new Date());
		volunteer.setActive(Boolean.TRUE);
		volunteer.setDelete(Boolean.FALSE);

		volunteer.setBirthDate(volunteerReq.getBirthDate());
		volunteer.setGender(volunteerReq.getGender());
		volunteer.setDocumentNumber(volunteerReq.getDocumentNumber());
		volunteer.setDocumentType(volunteerReq.getDocumentType());
		// detail.setId(UUID.randomUUID().toString());
		Volunteer volunteerSaved = volunteerRepo.save(volunteer);
		detail.setVolunteerId(volunteerSaved.getId());
		detail.setFingerPrintImage(volunteerReq.getFingerPrintImage().getBytes());
		detail.setVolunteerImage(volunteerReq.getVolunteerImage().getBytes());
		detail.setActive(Boolean.TRUE);
		detail.setDelete(Boolean.FALSE);
		detail.setCreatedBy(volunteerReq.getCreatedBy());
		detail.setModifiedBy(volunteerReq.getCreatedBy());
		detail.setCreatedDate(new Date());
		detail.setModifiedDate(new Date());
		VolunteerDetail volunteerDetailSaved = volunteerDetailRepo.save(detail);

		VolunteerInfo volunteerInfo = new VolunteerInfo();
		volunteerInfo.setAddress(volunteer.getAddress());
		volunteerInfo.setCreatedBy(volunteer.getCreatedBy());

		volunteerInfo.setFingerPrint(volunteer.getFingerPrint());
		volunteerInfo.setFirstName(volunteer.getFirstName());
		volunteerInfo.setLastName(volunteer.getLastName());
		volunteerInfo.setManufacturer(volunteer.getManufacturer());
		volunteerInfo.setMobileNumber(volunteer.getMobileNumber());
		volunteerInfo.setModel(volunteer.getModel());
		volunteerInfo.setSerialNumber(volunteer.getSerialNumber());
		volunteerInfo.setIsNew(Boolean.FALSE);
		volunteerInfo.setVolunteerId(volunteer.getId());
		VolunteerDetail volunteerDetail = volunteerDetailRepo.findByVolunteerId(volunteer.getId());
		volunteerInfo.setFingerPrintImage(
				volunteerDetail.getFingerPrintImage() != null ? new String(volunteerDetail.getFingerPrintImage())
						: null);
		volunteerInfo.setVolunteerImage(
				volunteerDetail.getVolunteerImage() != null ? new String(volunteerDetail.getVolunteerImage()) : null);
		auditService.saveAudit("8", volunteerSaved.getId() + "  DI - SN : " + volunteerSaved.getSerialNumber(),
				volunteerSaved.getCreatedBy());
	}

	public void updateVolunteer(VolunteerRequest volunteerReq) {
		Optional<Volunteer> volunteerOptional = volunteerRepo.findById(volunteerReq.getId());
		Volunteer volunteer = volunteerOptional.get();
		volunteer.setFirstName(volunteerReq.getFirstName());
		volunteer.setLastName(volunteerReq.getLastName());
		volunteer.setMobileNumber(volunteerReq.getMobileNumber());
		volunteer.setAddress(volunteerReq.getAddress());
		volunteer.setModifiedDate(new Date());
		volunteer.setModifiedBy(volunteerReq.getModifiedBy());

		volunteer.setBirthDate(volunteerReq.getBirthDate());
		volunteer.setDocumentNumber(volunteerReq.getDocumentNumber());
		volunteer.setDocumentType(volunteerReq.getDocumentType());
		volunteer.setGender(volunteerReq.getGender());
		Volunteer volunteerSaved = volunteerRepo.save(volunteer);
		auditService.saveAudit("9", volunteerSaved.getId().toString(), volunteerSaved.getModifiedBy());
	}

	public void blockVolunteer(VolunteerBlockDetail volunteerReq) {
		Optional<Volunteer> volunteerOptional = volunteerRepo.findById(volunteerReq.getVolunteerId());
		Volunteer volunteer = volunteerOptional.get();
//		volunteer.setEndDate(volunteerReq.getEndDate());
		volunteer.setBlocked(Boolean.TRUE);
		volunteer.setModifiedBy(volunteerReq.getModifiedBy());
		volunteer.setModifiedDate(new Date());
		volunteerReq.setActive(true);
		volunteerReq.setDelete(false);
		volunteerReq.setModifiedDate(new Date());
		volunteerReq.setCreatedDate(new Date());
		volunteerReq.setBlockStartDate(new Date());
		Volunteer volunteerSaved = volunteerRepo.save(volunteer);
		volunteerBlockDetailRepo.save(volunteerReq);
		auditService.saveAudit("14", volunteerSaved.getId() + "  DI -SN : " + volunteerSaved.getSerialNumber(),
				volunteerSaved.getModifiedBy());
	}

	public void deleteVolunteer(VolunteerRequest volunteerReq, HttpHeaders header) {
		Optional<Volunteer> volunteer = volunteerRepo.findById(volunteerReq.getId());
		VolunteerDetail volunteerDetail = volunteerDetailRepo.findByVolunteerId(volunteerReq.getId());
		VolunteerBlockDetail volunteerblockDetail = volunteerBlockDetailRepo.findByVolunteerId(volunteerReq.getId());
		volunteerblockDetail.setActive(Boolean.FALSE);
		volunteerblockDetail.setDelete(Boolean.TRUE);
		volunteerblockDetail.setModifiedBy(volunteerReq.getModifiedBy());
		volunteerblockDetail.setModifiedDate(new Date());
		volunteer.get().setDelete(Boolean.TRUE);
		volunteerDetail.setDelete(Boolean.TRUE);
		volunteerDetail.setActive(Boolean.FALSE);
		volunteer.get().setActive(Boolean.FALSE);
		volunteerDetail.setModifiedBy(volunteerReq.getModifiedBy());
		volunteer.get().setModifiedBy(volunteerReq.getModifiedBy());
		volunteerDetail.setModifiedDate(new Date());
		volunteer.get().setModifiedDate(new Date());
		volunteerDetailRepo.save(volunteerDetail);
		volunteerRepo.save(volunteer.get());
		List<String> who = header.get("who");
		auditService.saveAudit("12", volunteer.get().getId(), who.get(0));
	}

	public String getFingerPrint(HttpHeaders header, FingerPrintRequest body) {
		VolunteerInfo volunteerInfo = new VolunteerInfo();
		VolunteerResponse volunteerResponse = new VolunteerResponse();

		volunteerResponse.setFingerPrintInfo(body);
		List<Volunteer> volunteers = volunteerRepo.getAllVolunteer();
		boolean isMatch = false;

		for (Volunteer volunteer : volunteers) {
			isMatch = matchFingerPrint(body.getTemplateBase64(), volunteer.getFingerPrint());
			if (isMatch) {

				volunteerInfo.setAddress(volunteer.getAddress());
				volunteerInfo.setCreatedBy(volunteer.getCreatedBy());

				volunteerInfo.setFingerPrint(volunteer.getFingerPrint());
				volunteerInfo.setFirstName(volunteer.getFirstName());
				volunteerInfo.setLastName(volunteer.getLastName());
				volunteerInfo.setManufacturer(volunteer.getManufacturer());
				volunteerInfo.setMobileNumber(volunteer.getMobileNumber());
				volunteerInfo.setModel(volunteer.getModel());
				volunteerInfo.setSerialNumber(volunteer.getSerialNumber());
				volunteerInfo.setIsNew(Boolean.FALSE);
				volunteerInfo.setVolunteerId(volunteer.getId());
				volunteerInfo.setGender(volunteer.getGender());
				volunteerInfo.setDocumentNumber(volunteer.getDocumentNumber());
				volunteerInfo.setDocumentType(volunteer.getDocumentType());
				// volunteerInfo.setStudyNumber(volunteer.getStudyNumber());
				volunteerInfo.setBirthDate(volunteer.getBirthDate());
				volunteerResponse.setVolunteerInfo(volunteerInfo);
				VolunteerDetail volunteerDetail = volunteerDetailRepo.findByVolunteerId(volunteer.getId());
				volunteerInfo.setFingerPrintImage(volunteerDetail.getFingerPrintImage() != null
						? new String(volunteerDetail.getFingerPrintImage())
						: null);
				volunteerInfo.setVolunteerImage(
						volunteerDetail.getVolunteerImage() != null ? new String(volunteerDetail.getVolunteerImage())
								: null);
				break;
			}
		}
		if (!isMatch) {
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
				.header("Origin", "http://localhost:8080").field("template1", userFingerPrint)
				.field("template2", dbFingerPrint).field("licstr", "").field("templateFormat", "ISO").asString();

		System.out.println(response.getBody());
		Gson gson2 = new GsonBuilder().create();
		matchFingerPrintResponse = gson2.fromJson(response.getBody(), MatchFingerPrintResponse.class);

		if (matchFingerPrintResponse.getMatchingScore() >= 100) {
			return true;
		} else {
			return false;
		}

	}

	public VolunteerResponse getVolunteer(String id, HttpHeaders header) {
		List<String> who = header.get("who");

		VolunteerResponse response = new VolunteerResponse();
		VolunteerInfo volunteerInfo = new VolunteerInfo();
		Optional<Volunteer> optional = volunteerRepo.findById(id);
		VolunteerDetail volunteerDetail = volunteerDetailRepo.findByVolunteerId(id);
		VolunteerBlockDetail volunteerBlockDetail = volunteerBlockDetailRepo.findByVolunteerId(id);
		if (optional.isPresent()) {
			Volunteer vol = optional.get();
			volunteerInfo.setFirstName(vol.getFirstName());
			volunteerInfo.setLastName(vol.getLastName());
			volunteerInfo.setAddress(vol.getAddress());
			volunteerInfo.setMobileNumber(vol.getMobileNumber());
			volunteerInfo.setVolunteerId(vol.getId());
			volunteerInfo.setDocumentNumber(vol.getDocumentNumber());
			volunteerInfo.setDocumentType(vol.getDocumentType());
			volunteerInfo.setBirthDate(vol.getBirthDate());
			volunteerInfo.setBlocked(vol.getIsBlocked());
			volunteerInfo.setGender(vol.getGender());
			volunteerInfo.setFingerPrintImage(
					volunteerDetail.getFingerPrintImage() != null ? new String(volunteerDetail.getFingerPrintImage())
							: null);
			volunteerInfo.setVolunteerImage(
					volunteerDetail.getVolunteerImage() != null ? new String(volunteerDetail.getVolunteerImage())
							: null);
			if (volunteerBlockDetail != null) {
				volunteerInfo.setBlockStartDate(volunteerBlockDetail.getBlockStartDate());
				volunteerInfo.setBlockEndDate(volunteerBlockDetail.getBlockEndDate());
				volunteerInfo.setStudyNumber(volunteerBlockDetail.getStudyNumber());
				volunteerInfo.setRemarks(volunteerBlockDetail.getRemarks());
			}
			response.setVolunteerInfo(volunteerInfo);
			auditService.saveAudit("10", vol.getId(), who.get(0));
		}

		return response;
	}

	public List<VolunteerInfo> getAllVolunteer(HttpHeaders header) {
		List<VolunteerInfo> volunteers = new ArrayList<VolunteerInfo>();
		List<String> who = header.get("who");
		auditService.saveAudit("11", "", who.get(0));
		volunteerRepo.getAllVolunteer().stream().forEach(i -> {
			VolunteerInfo volunteerInfo = new VolunteerInfo();
			volunteerInfo.setVolunteerId(i.getId());
			volunteerInfo.setFirstName(i.getFirstName());
			volunteerInfo.setLastName(i.getLastName());
			volunteerInfo.setMobileNumber(i.getMobileNumber());
			volunteerInfo.setBlocked(i.getIsBlocked());
			VolunteerBlockDetail volBlockDetail = volunteerBlockDetailRepo.findByVolunteerId(i.getId());
			if (volBlockDetail != null) {
				volunteerInfo.setBlockStartDate(volBlockDetail.getBlockStartDate());
				volunteerInfo.setBlockEndDate(volBlockDetail.getBlockEndDate());
			}
			volunteers.add(volunteerInfo);
		});
		return volunteers;
	}

}
