package com.rewrite.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rewrite.Request.User;
import com.rewrite.entity.UserDetail;
import com.rewrite.repository.UserDetailRepository;

@Service
public class UserDetailService {

	@Autowired
	UserDetailRepository userRepo;

	public void addUser(User user) {
		UserDetail userDetail = new UserDetail();
		userDetail.setId(UUID.randomUUID().toString());
		userDetail.setUserName(user.getUserName());
		userDetail.setPassword("Vivek123");
		userDetail.setCreatedDate(new Date());
		userDetail.setModifiedDate(new Date());
		userDetail.setActive(Boolean.TRUE);
		userDetail.setDelete(Boolean.FALSE);
		userDetail.setRoleId(user.getRole());
		userRepo.save(userDetail);
	}

	public List<UserDetail> validateUser(User user) {
		List<UserDetail> userdet = userRepo.findByUserNameAndPassword(user.getUserName(), user.getPassword());
		return userdet;
	}

}
