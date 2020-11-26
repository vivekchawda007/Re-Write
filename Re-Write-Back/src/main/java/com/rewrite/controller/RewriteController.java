package com.rewrite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.rewrite.Request.User;
import com.rewrite.Response.RewriteResponse;
import com.rewrite.entity.UserDetail;
import com.rewrite.service.UserDetailService;
@RestController
public class RewriteController {
	
	@Autowired
	UserDetailService userService;
	
	@GetMapping("/getUSer")
	public String getUser() {
		return "abc";
	}
	
	@PostMapping(value = "/api/v1/add-user")
	public RewriteResponse addUser(@RequestBody User user) {
		userService.addUser(user);
		return new RewriteResponse("user added successfully", "200");
	}
	
	@PostMapping(value = "/api/v1/validate-user")
	public UserDetail validateUser(@RequestBody User user) {
		return userService.validateUser(user).get(0);
	}

}
