package com.rewrite.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rewrite.entity.UserDetail;
import com.rewrite.repository.UserDetailRepository;
import com.rewrite.request.UserRequest;

@Service
public class UserDetailService {

	@Autowired
	UserDetailRepository userRepo;

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
		userRepo.save(userDetail);
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
		userRepo.save(userDetail);
	}
	public void passwordReset(UserRequest user) {
		boolean password = true;
		UserDetail userDetail = userRepo.getOne(user.getId());
		userDetail.setNew(password);
		userDetail.setPassword("Vivek123");
		userDetail.setModifiedBy(user.getModifiedBy());
		userDetail.setModifiedDate(new Date());
		userRepo.save(userDetail);
	}
	
	public void deleteUser(UserRequest user) {
		UserDetail userDetail = userRepo.getOne(user.getId());
		userDetail.setDelete(Boolean.TRUE);
		userRepo.save(userDetail);
	}


	public List<UserDetail> validateUser(UserRequest user) {
		List<UserDetail> userdet = userRepo.findByUserNameAndPassword(user.getUserName(), user.getPassword());
		return userdet;
	}
	
	public UserDetail getUser(String id) {
		return userRepo.findById(id).get();
		 
	}
	
	
	public List<UserDetail> getAllUser(){
		return userRepo.getAllUser();
	}

}
