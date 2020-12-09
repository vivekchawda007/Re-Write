package com.rewrite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rewrite.response.AuditResponse;
import com.rewrite.service.AuditService;

@RestController
@CrossOrigin("*")
public class AuditController {

	@Autowired
	AuditService auditService;
	
	
	@GetMapping(value = "/api/v1/get-all-audit")
	public List<AuditResponse> getAllAuditRecord() {
		return auditService.getAllAudits();
	}
}
