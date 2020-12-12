package com.rewrite.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rewrite.entity.Activity;
import com.rewrite.entity.Audit;
import com.rewrite.entity.UserDetail;
import com.rewrite.repository.ActivityRepository;
import com.rewrite.repository.AuditRepository;
import com.rewrite.repository.RoleRepository;
import com.rewrite.repository.UserDetailRepository;
import com.rewrite.response.AuditResponse;

import antlr.StringUtils;

@Service
public class AuditService {

	@Autowired
	AuditRepository auditRepository;
	
	@Autowired
	ActivityRepository activityRepository;
	
	@Autowired
	UserDetailRepository userDetailRepository;
	
	@Autowired
	RoleRepository roleRepository;
	@SuppressWarnings("null")
	public List<AuditResponse> getAllAudits() {
		List<AuditResponse> lst = new ArrayList<>();
		List<Audit> audits = auditRepository.findAll();
		for(Audit a : audits) {
			Optional<UserDetail> ud = Optional.empty();
			Optional<Object> act = Optional.empty();
			ud = userDetailRepository.findById(a.getUserId());
			AuditResponse auditsResponse = new AuditResponse();
			auditsResponse.setId(a.getId());
			auditsResponse.setActivity(activityRepository.findById(a.getActivityId()).get().getName());
			auditsResponse.setMetadata(a.getMetadata());
			auditsResponse.setUserId(a.getUserId());
			auditsResponse.setUserName(ud.get().getUserName());
			auditsResponse.setRole(roleRepository.findById(ud.get().getRoleId()).get().getName());
			auditsResponse.setAuditTime(a.getAuditTime());
			lst.add(auditsResponse);
		}
		return lst;
	}
	
	
	public Audit saveAudit(String activityId, String metadata,String userId) {
		Audit audit = new Audit();
		audit.setId(UUID.randomUUID().toString().replace("-", ""));
		audit.setActivityId(activityId);
		audit.setAuditTime(new Date());
		audit.setMetadata(metadata);
		audit.setUserId(userId);
		auditRepository.save(audit);
		return audit;
	}
}