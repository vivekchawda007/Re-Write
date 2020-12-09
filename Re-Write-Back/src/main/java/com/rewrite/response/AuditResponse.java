package com.rewrite.response;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "id", "userId", "userName", "activity", "metadata" })
public class AuditResponse {

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
	
	@JsonProperty("role")
	private String role;
	
	private Date auditTime;
	
	
	public Date getAuditTime() {
		return auditTime;
	}

	public void setAuditTime(Date auditTime) {
		this.auditTime = auditTime;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

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

}