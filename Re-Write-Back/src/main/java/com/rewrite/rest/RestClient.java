package com.rewrite.rest;

import java.util.Arrays;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
@Component
public class RestClient {

	
	public ResponseEntity<Object> callSecugen(String uri,HttpMethod method, HttpEntity<String> entity)
	{
	    
	    RestTemplate restTemplate = new RestTemplate();
        
		/*
		 * MappingJackson2HttpMessageConverter converter = new
		 * MappingJackson2HttpMessageConverter();
		 * 
		 * 
		 * converter.setSupportedMediaTypes( Arrays.asList(new
		 * MediaType[]{MediaType.APPLICATION_JSON,
		 * MediaType.APPLICATION_OCTET_STREAM}));
		 * 
		 * restTemplate.setMessageConverters(Arrays.asList(converter, new
		 * FormHttpMessageConverter()));
		 */ResponseEntity response = restTemplate.exchange(uri,method, entity, String.class);
		 
		 System.out.println(response);
	    return null;
	    //Use the response.getBody()
	}
}
