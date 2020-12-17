package com.rewrite.service;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.ListItem;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.rewrite.entity.Audit;
import com.rewrite.entity.UserDetail;
import com.rewrite.repository.ActivityRepository;
import com.rewrite.repository.AuditRepository;
import com.rewrite.repository.RoleRepository;
import com.rewrite.repository.UserDetailRepository;
import com.rewrite.request.AuditReq;
import com.rewrite.response.AuditResponse;

@Service
public class AuditService {

	@Autowired
	AuditRepository auditRepository;

	@Autowired
	ActivityRepository activityRepository;

	@Autowired
	UserDetailRepository userDetailRepository;

	@Autowired
	RoleRepository roleRepository;

	@SuppressWarnings("null")
	public List<AuditResponse> getAllAudits() {
		List<AuditResponse> lst = new ArrayList<>();
		List<Audit> audits = auditRepository.getAllAudits();
		for (Audit a : audits) {
			Optional<UserDetail> ud = Optional.empty();
			Optional<Object> act = Optional.empty();
			ud = userDetailRepository.findById(a.getUserId());
			AuditResponse auditsResponse = new AuditResponse();
			auditsResponse.setId(a.getId());
			auditsResponse.setActivity(activityRepository.findById(a.getActivityId()).get().getName());
			auditsResponse.setMetadata(a.getMetadata());
			auditsResponse.setUserId(a.getUserId());
			auditsResponse.setUserName(ud.get().getUserName());
			auditsResponse.setRole(roleRepository.findById(ud.get().getRoleId()).get().getName());
			auditsResponse.setAuditTime(a.getAuditTime());
			lst.add(auditsResponse);
		}
		return lst;
	}

	public void generatePdf(String requestBody) {

		
		  Gson gson2 = new GsonBuilder().create(); AuditReq[] audits =
		  gson2.fromJson(requestBody, AuditReq[].class);
		 

		 // Creating a PdfWriter object
	      String file = "tempPdf.pdf";       
	      PdfDocument pdfDoc = null;
		try {
			pdfDoc = new PdfDocument(new PdfWriter(file));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}                   
	      
	      // Creating a Document object       
	      Document doc = new Document(pdfDoc);               
	      
	      // Creating a table       
	      float [] pointColumnWidths = {300F, 300F};       
	      Table table = new Table(pointColumnWidths);                            
	      
	      // Adding row 1 to the table                
	      Cell c1 = new Cell();       
	      c1.add("id");       
	      c1.setTextAlignment(TextAlignment.LEFT);       
	      table.addCell(c1);                      
	      
	      com.itextpdf.layout.element.List list1 = new com.itextpdf.layout.element.List();       
	      ListItem item1 = new ListItem("JavaFX");
	      ListItem item2 = new ListItem("Java");       
	      ListItem item3 = new ListItem("Java Servlets");              
	      list1.add(item1);       
	      list1.add(item2);       
	      list1.add(item3);                 
	      
	      Cell c2 = new Cell();       
	      c2.add(list1);       
	      c2.setTextAlignment(TextAlignment.LEFT);       
	      table.addCell(c2);                 
	      
	      // Adding row 2 to the table                
	      Cell c3 = new Cell();       
	      c3.add("No SQL Databases");       
	      c3.setTextAlignment(TextAlignment.LEFT);       
	      table.addCell(c3);                     
	
	      
	      // Adding Table to document        
	      doc.add(table);                  
	      
	      // Closing the document       
	      doc.close();  
	      System.out.println("Lists added to table successfully..");    
	      
		System.out.println("Lists added to table successfully..");
		
	}

	public Audit saveAudit(String activityId, String metadata, String userId) {
		Audit audit = new Audit();
		audit.setId(UUID.randomUUID().toString().replace("-", ""));
		audit.setActivityId(activityId);
		audit.setAuditTime(new Date());
		audit.setMetadata(metadata);
		audit.setUserId(userId);
		auditRepository.save(audit);
		return audit;
	}
}
