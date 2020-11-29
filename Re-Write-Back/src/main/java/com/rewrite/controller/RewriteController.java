package com.rewrite.controller;

import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.rewrite.Request.User;
import com.rewrite.Request.Volunteer;
import com.rewrite.Response.RewriteResponse;
import com.rewrite.entity.UserDetail;
import com.rewrite.rest.RestClient;
import com.rewrite.service.SecugenService;
import com.rewrite.service.UserDetailService;
import com.rewrite.service.VolunteerService;

import SecuGen.FDxSDKPro.jni.JSGFPLib;
import SecuGen.FDxSDKPro.jni.SGDeviceInfoParam;
import SecuGen.FDxSDKPro.jni.SGFDxDeviceName;
import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

@RestController
@CrossOrigin("*")
public class RewriteController {

	@Autowired
	UserDetailService userService;

	@Autowired
	VolunteerService volunteerService;

	@Autowired
	RestClient restClient;

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

	@PostMapping(value = "/api/v1/add-volunteer")
	public RewriteResponse addVolunteer(@RequestBody Volunteer volunteer, @RequestHeader HttpHeaders header) {
		volunteerService.addVolunteer(volunteer);
		return new RewriteResponse("Volunteer added successfully", "200");
	}

	@GetMapping(value = "/api/v1/get-fingerprint")
	public String addFingerPrint(@RequestHeader HttpHeaders header) {
		SecugenService secugenService = new SecugenService();
		String body = "{\r\n    \"Timeout\":10000,\r\n    \"Quality\":1,\r\n    \"licstr\": \"\",\r\n    \"templateFormat\":\"ISO\"\r\n}";
		

		  HttpResponse<String> response =
		  Unirest.post("https://localhost:8443/SGIFPCapture") .header("Host",
		  " localhost:8443") .header("Origin", "http://localhost:8080")
		  .body(body
		  ) .asString();
		  
		  System.out.println(response.getBody());
		 return response.getBody();

	}

	public ResponseEntity<String> getFingerPrint(HttpHeaders header, String body) {

		URL url;
		/*
		 * try { url = new URL("sample url");
		 * 
		 * 
		 * String postData = "key1=valu1&key2=valu2";
		 * 
		 * HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		 * conn.setReadTimeout(55000 milliseconds ); conn.setConnectTimeout(55000
		 * milliseconds ); conn.setRequestMethod("POST"); conn.setDoInput(true);
		 * conn.setDoOutput(true); OutputStream os; os = conn.getOutputStream();
		 * 
		 * BufferedWriter writer = new BufferedWriter( new OutputStreamWriter(os));
		 * writer.write(postData);
		 * 
		 * writer.flush(); writer.close(); os.close(); } catch (Exception e) { // TODO
		 * Auto-generated catch block e.printStackTrace(); }
		 */
		RestClient restClient = new RestClient();
		System.out.println("*****************************" + header);
		HttpHeaders hed = new HttpHeaders();
		// hed.add("Accept", " */*");
		// hed.add("Accept-Encoding", " gzip, deflate, br");
		// hed.add("Accept-Language", "en-US,en;q=0.9");
		// hed.add("Connection", "keep-alive");
		hed.add("Content-Length", "91");
		hed.add("User-Agent",
				"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Mobile Safari/537.36");
		// hed.add("Content-Type", " text/plain;charset=UTF-8");
		hed.add("Host", "localhost:8443");
		hed.add("Origin", "http://localhost:8080");
		// hed.add("Referer", "http://localhost:8080");
		// hed.add("Sec-Fetch-Dest", " empty");
		// hed.add("Sec-Fetch-Mode", " cors");
		// hed.add("Sec-Fetch-Site", "cross-site");
		// hed.add("User-Agent", " Mozilla/5.0 (Linux; Android 6.0; Nexus 5
		// Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66
		// Mobile Safari/537.36");

		HttpEntity<String> entity = new HttpEntity<>(body, hed);
		ResponseEntity<String> response = this.callSecugen("https://localhost:8443/SGIFPCapture", HttpMethod.POST,
				entity);
		return response;

	}

	public ResponseEntity<String> callSecugen(String uri, HttpMethod method, HttpEntity<String> entity) {

		RestTemplate restTemplate = new RestTemplate();

		System.out.println("header================" + entity.getHeaders());
		System.out.println("body================" + entity.getBody());

		ResponseEntity response = restTemplate.exchange(uri, method, entity, String.class);

		System.out.println(response);
		return response;
		// Use the response.getBody()
	}

}
