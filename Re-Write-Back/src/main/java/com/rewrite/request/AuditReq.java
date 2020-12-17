package com.rewrite.request;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "id", "userId", "userName", "activity", "metadata", "auditTime", "role" })
public class AuditReq {

	@JsonProperty("id")
	private String id;
	@JsonProperty("userId")
	private String userId;
	@JsonProperty("userName")
	private String userName;
	@JsonProperty("activity")
	private String activity;
	@JsonProperty("metadata")
	private String metadata;
	@JsonProperty("auditTime")
	private String auditTime;
	@JsonProperty("role")
	private String role;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<String, Object>();

	@JsonProperty("id")
	public String getId() {
		return id;
	}

	@JsonProperty("id")
	public void setId(String id) {
		this.id = id;
	}

	@JsonProperty("userId")
	public String getUserId() {
		return userId;
	}

	@JsonProperty("userId")
	public void setUserId(String userId) {
		this.userId = userId;
	}

	@JsonProperty("userName")
	public String getUserName() {
		return userName;
	}

	@JsonProperty("userName")
	public void setUserName(String userName) {
		this.userName = userName;
	}

	@JsonProperty("activity")
	public String getActivity() {
		return activity;
	}

	@JsonProperty("activity")
	public void setActivity(String activity) {
		this.activity = activity;
	}

	@JsonProperty("metadata")
	public String getMetadata() {
		return metadata;
	}

	@JsonProperty("metadata")
	public void setMetadata(String metadata) {
		this.metadata = metadata;
	}

	@JsonProperty("auditTime")
	public String getAuditTime() {
		return auditTime;
	}

	@JsonProperty("auditTime")
	public void setAuditTime(String auditTime) {
		this.auditTime = auditTime;
	}

	@JsonProperty("role")
	public String getRole() {
		return role;
	}

	@JsonProperty("role")
	public void setRole(String role) {
		this.role = role;
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