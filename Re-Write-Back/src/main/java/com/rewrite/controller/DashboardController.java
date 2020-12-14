package com.rewrite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rewrite.response.Stats;
import com.rewrite.service.DashboardService;

@RestController
@CrossOrigin("*")
public class DashboardController {

	@Autowired
	DashboardService dashboardService;

	@GetMapping(value = "/api/v1/get-stats")
	public Stats getAllAuditRecord() {
		return dashboardService.getStats();
	}
}