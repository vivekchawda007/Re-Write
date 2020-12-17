package com.rewrite.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.itextpdf.io.codec.Base64.InputStream;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.rewrite.request.AuditReq;
import com.rewrite.request.AuditReqArray;
import com.rewrite.response.AuditResponse;
import com.rewrite.response.MatchFingerPrintResponse;
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
