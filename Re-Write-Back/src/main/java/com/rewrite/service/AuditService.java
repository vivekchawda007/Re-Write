package com.rewrite.service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.DottedLineSeparator;
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
	public List<AuditResponse> getAllAudits(HttpHeaders headers) {
		List<String> who = headers.get("who");
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
		saveAudit("16", "", who.get(0));
		return lst;
	}
	
	@SuppressWarnings("null")
	public List<AuditResponse> getAllRegistrarAudit(HttpHeaders headers) {
		List<String> who = headers.get("who");
		List<AuditResponse> lst = new ArrayList<>();
		List<Audit> audits = auditRepository.getAllRegistrarAudit();
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
		saveAudit("16", "", who.get(0));
		return lst;
	}

	public void generatePdf(String requestBody, HttpHeaders headers) {
		List<String> who = headers.get("who");
		PdfPTable table = new PdfPTable(new float[] {8 ,16, 15, 13, 28, 20 });
		Optional<UserDetail> ud = userDetailRepository.findById(who.get(0));
		Gson gson2 = new GsonBuilder().create();
		AuditReq[] audits = gson2.fromJson(requestBody, AuditReq[].class);
		Font boldFont = new Font(Font.FontFamily.TIMES_ROMAN, 18, Font.BOLD);
		Font boldFontSmall = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
		Chunk linebreak = new Chunk(new DottedLineSeparator());

		Path path = Paths.get("tempPdf.pdf");

		// deleteIfExists File
		try {

			Files.deleteIfExists(path);
		} catch (IOException e) {

			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Paragraph paragraph = new Paragraph("Company name : Quantys Clinical Private Limited", boldFont);
		Paragraph paragraphDate = new Paragraph("Report Generation Date - " + new Date().toString(), boldFontSmall);
		Paragraph paragraphWho = new Paragraph(
				"Report Generated By  - " + ud.get().getFirstName() + " " + ud.get().getLastName(), boldFontSmall);
		Paragraph paragraphGstn = new Paragraph("GSTN Number  - 18AABCT3518Q1ZV", boldFontSmall);
		paragraph.setAlignment(Element.ALIGN_LEFT);
		String file = "tempPdf.pdf";
		Document doc = new Document();
		PdfWriter writer = null;
		try {
			writer = PdfWriter.getInstance(doc, new FileOutputStream(file));
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (DocumentException e1) {
			e1.printStackTrace();
		}
		HeaderFooterPageEvent event = new HeaderFooterPageEvent();
		writer.setPageEvent(event);
		doc.open();
		try {
			doc.add(paragraph);
			doc.add(linebreak);
			doc.add(paragraphDate);
			doc.add(paragraphWho);
			doc.add(paragraphGstn);
			doc.add(linebreak);
		} catch (DocumentException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		generateCell("No", true,table);
		generateCell("Activity", true,table);
		generateCell("User", true,table);
		generateCell("Role", true,table);
		generateCell("Audit Date/Time", true,table);
		generateCell("Metadata", true,table);
		for (int i = 0; i < audits.length; i++) {
			generateCell(String.valueOf(i+1), false,table);
			generateCell(audits[i].getActivity(), false,table);
			generateCell(audits[i].getUserId(), false,table);
			generateCell(audits[i].getRole(), false,table);
			Date date1 = null;
			try {
				date1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").parse(audits[i].getAuditTime());
			} catch (ParseException e) {
				e.printStackTrace();
			}
			final long HOUR = 19800000;
			Date finalDate = new Date(date1.getTime() + HOUR);
			generateCell(new SimpleDateFormat("MM/dd/yy, hh:mm a").format(finalDate), false,table);
			generateCell(audits[i].getMetadata(), false,table);
		}
		
		try {
			doc.add(table);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		doc.close();
		saveAudit("15", "", who.get(0));
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

	public Phrase getTablePhrase(String phrase, boolean isBold) {
		if (isBold) {
			Font boldFont = new Font(Font.FontFamily.TIMES_ROMAN, 18, Font.BOLD);
			return new Phrase(phrase, boldFont);
		}
		return new Phrase(phrase);

	}

	public void generateCell(String cellContent, boolean isBold,PdfPTable table) {
		
		PdfPCell c1 = null;
		c1 = null;
		c1 = new PdfPCell(getTablePhrase(cellContent, isBold));
		c1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table.addCell(c1);
	}
}
