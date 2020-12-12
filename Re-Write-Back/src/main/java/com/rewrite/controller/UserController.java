package com.rewrite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.rewrite.entity.UserDetail;
import com.rewrite.request.UserRequest;
import com.rewrite.response.RewriteResponse;
import com.rewrite.service.AuditService;
import com.rewrite.service.UserDetailService;

@RestController
@CrossOrigin("*")
public class UserController {

	@Autowired
	UserDetailService userService;
	
	@Autowired
	AuditService auditService;
	
	@PostMapping(value = "/api/v1/add-user")
	public RewriteResponse addUser(@RequestBody UserRequest user, @RequestHeader HttpHeaders header) {
		userService.addUser(user);
		return new RewriteResponse("user added successfully", "200");
	}

	@PostMapping(value = "/api/v1/validate-user")
	public UserDetail validateUser(@RequestBody UserRequest user) {
		UserDetail userDetail =  userService.validateUser(user);
		return userDetail;
	}

	@PutMapping(value = "/api/v1/update-user")
	public RewriteResponse updateUser(@RequestBody UserRequest user) {
		userService.updateUser(user);
		return new RewriteResponse("User updated successfully", "200");
	}

	@PutMapping(value = "/api/v1/password-reset")
	public RewriteResponse passwordReset(@RequestBody UserRequest user) {
		userService.passwordReset(user);
		return new RewriteResponse("User updated successfully", "200");
	}

	@PutMapping(value = "/api/v1/delete-user")
	public RewriteResponse deleteUser(@RequestBody UserRequest user) {
		userService.deleteUser(user);
		return new RewriteResponse("User deleted successfully", "200");
	}

	@GetMapping(value = "/api/v1/get-user/{id}")
	public UserDetail getUser(@PathVariable("id") String userId) {

		return userService.getUser(userId);
	}

	@GetMapping(value = "/api/v1/get-all-user")
	public List<UserDetail> getAllUser(@RequestHeader HttpHeaders header) {

		return userService.getAllUser();
	}

}
