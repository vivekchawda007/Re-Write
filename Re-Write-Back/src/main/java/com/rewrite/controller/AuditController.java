package com.rewrite.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.rewrite.response.AuditResponse;
import com.rewrite.service.AuditService;

@RestController
@CrossOrigin("*")
public class AuditController {

	@Autowired
	AuditService auditService;

	@GetMapping(value = "/api/v1/get-all-audit")
	public List<AuditResponse> getAllAuditRecord(@RequestHeader HttpHeaders headers) {
		return auditService.getAllAudits(headers);
	}
	
	@GetMapping(value = "/api/v1/get-all-registrar-audit")
	public List<AuditResponse> getAllRegistrarAudit(@RequestHeader HttpHeaders headers) {
		return auditService.getAllRegistrarAudit(headers);
	}


	@PostMapping(value = "/api/v1/generate-pdf")
	public ResponseEntity<InputStreamResource> generatePdf(@RequestBody String body,@RequestHeader HttpHeaders header) {
		auditService.generatePdf(body,header);
		
		File file = new File("tempPdf.pdf");

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
