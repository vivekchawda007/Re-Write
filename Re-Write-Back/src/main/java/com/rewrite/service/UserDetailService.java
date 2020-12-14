package com.rewrite.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rewrite.entity.Audit;
import com.rewrite.entity.UserDetail;
import com.rewrite.repository.ActivityRepository;
import com.rewrite.repository.AuditRepository;
import com.rewrite.repository.UserDetailRepository;
import com.rewrite.request.UserRequest;

@Service
public class UserDetailService {

	@Autowired
	UserDetailRepository userRepo;

	@Autowired
	ActivityRepository activityRepository;
	
	@Autowired
	AuditService auditService;
	@Autowired
	AuditRepository auditRepository;
	public void addUser(UserRequest user) {
		
		UserDetail userDetail = new UserDetail();
		userDetail.setId(UUID.randomUUID().toString());
		userDetail.setUserName(user.getUserName());
		userDetail.setFirstName(user.getFirstName());
		userDetail.setLastName(user.getLastName());
		userDetail.setPassword("Vivek123");
		userDetail.setCreatedBy(user.getCreatedBy());
		userDetail.setCreatedDate(new Date());
		userDetail.setModifiedDate(new Date());
		userDetail.setActive(Boolean.TRUE);
		userDetail.setDelete(Boolean.FALSE);
		userDetail.setRoleId(user.getRole());
		userDetail.setNew(Boolean.TRUE);
		UserDetail savedUser = userRepo.save(userDetail);
		auditService.saveAudit("4", savedUser.getUserName(), savedUser.getCreatedBy());
	}
	
	public void updateUser(UserRequest user) {
		
		UserDetail userDetail = userRepo.getOne(user.getId());
		userDetail.setFirstName(user.getFirstName());
		userDetail.setLastName(user.getLastName());
		userDetail.setUserName(user.getUserName());
		userDetail.setPassword("Vivek123");
		userDetail.setModifiedBy(user.getModifiedBy());
		userDetail.setModifiedDate(new Date());
		userDetail.setRoleId(user.getRole());
		UserDetail savedUser = userRepo.save(userDetail);
		auditService.saveAudit("5", savedUser.getId(), savedUser.getCreatedBy());
	}
	

	public void updatePassword(UserRequest user) {
		boolean isNewMatch = false;
		UserDetail userDetail = userRepo.getOne(user.getId());
		userDetail.setPassword(user.getPassword());
		userDetail.setNew(isNewMatch);
		UserDetail savedUser = userRepo.save(userDetail);
		auditService.saveAudit("5", savedUser.getId(), savedUser.getCreatedBy());
	}
	public void passwordReset(UserRequest user) {
		
		boolean password = true;
		UserDetail userDetail = userRepo.getOne(user.getId());
		userDetail.setNew(password);
		userDetail.setPassword("Vivek123");
		userDetail.setModifiedBy(user.getModifiedBy());
		userDetail.setModifiedDate(new Date());
		UserDetail savedUser = userRepo.save(userDetail);
		auditService.saveAudit("5", savedUser.getId(), savedUser.getModifiedBy());
	}
	
	public void deleteUser(UserRequest user) {
		
		UserDetail userDetail = userRepo.getOne(user.getId());
		userDetail.setDelete(Boolean.TRUE);
		UserDetail savedUser = userRepo.save(userDetail);
		auditService.saveAudit("6", savedUser.getId(), savedUser.getModifiedBy());
	}


	public UserDetail validateUser(UserRequest user) {
		
		List<UserDetail> userdet = userRepo.findByUserNameAndPassword(user.getUserName(), user.getPassword());
		
		if(!userdet.isEmpty()) {
			
			auditService.saveAudit("2","", userdet.get(0).getId());
			userdet.get(0).setPassword("***");
			return userdet.get(0);
		}else {
			UserDetail fakeUserDetail = new UserDetail();
			fakeUserDetail.setUserName("NO_USER_FOUND");
			//auditUtil.saveAudit("2","", user.getUserName());
			return fakeUserDetail;
		}
		
		
	}
	
	public UserDetail getUser(String id) {
		/* auditUtil.saveAudit("2","",id)); */
		return userRepo.findById(id).get();
		 
	}
	
	
	public List<UserDetail> getAllUser(){
		return userRepo.getAllUser();
	}

}
