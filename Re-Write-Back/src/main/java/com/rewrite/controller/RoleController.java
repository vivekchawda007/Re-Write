package com.rewrite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rewrite.service.RoleService;

@RestController
@CrossOrigin("*")
public class RoleController {

	@Autowired
	RoleService roleService;
	
	@GetMapping(value = "/api/v1/roles")
	public String getAllRoles() {
		return roleService.getAllRoles();
	}
}
