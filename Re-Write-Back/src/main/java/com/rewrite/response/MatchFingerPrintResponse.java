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
@JsonPropertyOrder({ "ErrorCode", "MatchingScore" })
public class MatchFingerPrintResponse {

	@JsonProperty("ErrorCode")
	private Integer ErrorCode;
	@JsonProperty("MatchingScore")
	private Integer MatchingScore;
	public Integer getErrorCode() {
		return ErrorCode;
	}
	public void setErrorCode(Integer errorCode) {
		ErrorCode = errorCode;
	}
	public Integer getMatchingScore() {
		return MatchingScore;
	}
	public void setMatchingScore(Integer matchingScore) {
		MatchingScore = matchingScore;
	}
	
	

}
