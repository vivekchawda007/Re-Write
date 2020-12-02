package com.rewrite.response;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "fingerPrintInfo", "volunteerInfo" })
public class VolunteerResponse {

	@JsonProperty("fingerPrintInfo")
	private FingerPrintResponse fingerPrintInfo;
	@JsonProperty("volunteerInfo")
	private VolunteerInfo volunteerInfo;
	
	@JsonProperty("fingerPrintInfo")
	public FingerPrintResponse getFingerPrintInfo() {
		return fingerPrintInfo;
	}

	@JsonProperty("fingerPrintInfo")
	public void setFingerPrintInfo(FingerPrintResponse fingerPrintInfo) {
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
