package com.rewrite.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import com.rewrite.rest.RestClient;

@Service
public class SecugenService {


	public ResponseEntity<Object> getFingerPrint(@RequestHeader HttpHeaders header) {
		RestClient restClient = new RestClient();
		 System.out.println("*****************************" +header);
		HttpEntity<String> entity = new HttpEntity<>("{\r\n" + 
				"    \"Timeout\":10000,\r\n" + 
				"    \"Quality\":1,\r\n" + 
				"    \"licstr\": \"\",\r\n" + 
				"    \"templateFormat\":\"ISO\"\r\n" + 
				"}", header);
		ResponseEntity<Object> response = restClient.callSecugen(
				"https://localhost:8443/SGIFPCapture",
				HttpMethod.POST, entity);
		return response;

	}

}
