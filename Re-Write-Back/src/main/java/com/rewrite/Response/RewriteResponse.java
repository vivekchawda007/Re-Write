package com.rewrite.Response;

public class RewriteResponse {
	
	private String message;
	private String responseCode;
	
	public RewriteResponse(String message, String responseCode) {
		super();
		this.message = message;
		this.responseCode = responseCode;
	}
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getResponseCode() {
		return responseCode;
	}
	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}
	
	

}
