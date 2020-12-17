package com.rewrite.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

	@PostMapping(value = "/api/v1/generate-pdf")
	public ResponseEntity<InputStreamResource> generatePdf(@RequestBody String body) {
		auditService.generatePdf(body);
		
		File file = new File("addingObjects.pdf");

		InputStreamResource resource = null;
		try {
			resource = new InputStreamResource(new FileInputStream(file));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return ResponseEntity.ok()

				.contentLength(file.length()).contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
	} // Write directly the output stream.

}
