package com.rewrite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.rewrite.entity.RoleDetail;
import com.rewrite.repository.RoleRepository;

@Service
public class RoleService {

	@Autowired
	RoleRepository roleRepository;
	public String getAllRoles() {
		List<RoleDetail> roles = roleRepository.findAll();
		Gson gsonResponse = new Gson();
		String rolesResponse = gsonResponse.toJson(roles);
		return rolesResponse;
	}

}
