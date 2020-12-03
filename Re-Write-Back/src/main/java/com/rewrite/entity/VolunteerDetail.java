package com.rewrite.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="VOLUNTEER_DETAIL")
public class VolunteerDetail {
	
	@Id
	@Column(name="id")
	private String id;
	
	@Column(name="VOLUNTEER_ID")
	private String volunteerId;


	@Column(name="FINGER_PRINT_IMAGE")
	private byte[] fingerPrintImage;
	
	@Column(name="VOLUNTEER_IMAGE")
	private byte[] volunteerImage;

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
