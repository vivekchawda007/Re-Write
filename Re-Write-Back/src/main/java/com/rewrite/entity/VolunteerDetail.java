package com.rewrite.entity;

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
