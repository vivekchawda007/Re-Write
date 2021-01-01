package com.rewrite.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;


@Entity
@Table(name="VOLUNTEER_DETAIL")
public class VolunteerDetail {
	
	@Id
	@GenericGenerator(name = "seq_vol_det_id", strategy = "com.rewrite.entity.primary.VolunteerDetailIdGenerate")
	@GeneratedValue(generator = "seq_vol_det_id")  
	@Column(name="id")
	private String id;
	@Column(name="VOLUNTEER_ID")
	private String volunteerId;


	@Column(name="FINGER_PRINT_IMAGE")
	private byte[] fingerPrintImage;
	
	@Column(name="VOLUNTEER_IMAGE")
	private byte[] volunteerImage;


	@Column(name="IS_DELETED")
	private boolean isDelete;
	
	@Column(name="IS_ACTIVE")
	private boolean isActive;
	

	@Column(name="CREATED_BY")
	private String createdBy;

	@Column(name="CREATED_DATE")
	private Date createdDate;
	
	@Column(name="MODIFIED_BY")
	private String modifiedBy;

	@Column(name="MODIFIED_DATE")
	private Date modifiedDate;
	
	
	public boolean isDelete() {
		return isDelete;
	}

	public void setDelete(boolean isDelete) {
		this.isDelete = isDelete;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getVolunteerId() {
		return volunteerId;
	}

	public void setVolunteerId(String volunteerId) {
		this.volunteerId = volunteerId;
	}

	public byte[] getFingerPrintImage() {
		return fingerPrintImage;
	}

	public void setFingerPrintImage(byte[] fingerPrintImage) {
		this.fingerPrintImage = fingerPrintImage;
	}

	public byte[] getVolunteerImage() {
		return volunteerImage;
	}

	public void setVolunteerImage(byte[] volunteerImage) {
		this.volunteerImage = volunteerImage;
	}
	
	
	
	
}
