package com.rewrite.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="AUDIT")
public class Audit {
	@Id
	@Column(name="id")
	private String id;
	
	@Column(name="ACTIVITY_ID")
	private String activityId;
	
	@Column(name="USER_ID")
	private String userId;
	
	@Column(name="METADATA")
	private String metadata;
	

	@Column(name="AUDIT_TIME")
	private Date auditTime;
	
	
	
	public Date getAuditTime() {
		return auditTime;
	}
	public void setAuditTime(Date auditTime) {
		this.auditTime = auditTime;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getActivityId() {
		return activityId;
	}
	public void setActivityId(String activityId) {
		this.activityId = activityId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getMetadata() {
		return metadata;
	}
	public void setMetadata(String metadata) {
		this.metadata = metadata;
	}
	
	

}
