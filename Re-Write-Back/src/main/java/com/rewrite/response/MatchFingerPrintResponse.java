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
	private Integer errorCode;
	@JsonProperty("MatchingScore")
	private Integer matchingScore;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<String, Object>();

	@JsonProperty("ErrorCode")
	public Integer getErrorCode() {
		return errorCode;
	}

	@JsonProperty("ErrorCode")
	public void setErrorCode(Integer errorCode) {
		this.errorCode = errorCode;
	}

	@JsonProperty("MatchingScore")
	public Integer getMatchingScore() {
		return matchingScore;
	}

	@JsonProperty("MatchingScore")
	public void setMatchingScore(Integer matchingScore) {
		this.matchingScore = matchingScore;
	}

	@JsonAnyGetter
	public Map<String, Object> getAdditionalProperties() {
		return this.additionalProperties;
	}

	@JsonAnySetter
	public void setAdditionalProperty(String name, Object value) {
		this.additionalProperties.put(name, value);
	}

}
