package com.rewrite.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.rewrite.request.FingerPrintRequest;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "fingerPrintInfo", "volunteerInfo" })
public class VolunteerResponse {

	@JsonProperty("fingerPrintInfo")
	private FingerPrintRequest fingerPrintInfo;
	@JsonProperty("volunteerInfo")
	private VolunteerInfo volunteerInfo;
	
	@JsonProperty("fingerPrintInfo")
	public FingerPrintRequest getFingerPrintInfo() {
		return fingerPrintInfo;
	}

	@JsonProperty("fingerPrintInfo")
	public void setFingerPrintInfo(FingerPrintRequest fingerPrintInfo) {
		this.fingerPrintInfo = fingerPrintInfo;
	}

	@JsonProperty("volunteerInfo")
	public VolunteerInfo getVolunteerInfo() {
		return volunteerInfo;
	}

	@JsonProperty("volunteerInfo")
	public void setVolunteerInfo(VolunteerInfo volunteerInfo) {
		this.volunteerInfo = volunteerInfo;
	}

}
