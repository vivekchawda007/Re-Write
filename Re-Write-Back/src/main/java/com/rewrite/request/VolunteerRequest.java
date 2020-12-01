package com.rewrite.request;

import java.sql.Blob;
import java.util.Date;

public class VolunteerRequest {
	
	private String firstName;
	private String lastName;
	private String mobileNumber;
	private String address;
	private String fingerPrint;
	private String manufacturer;
	private String serialNumber;
	private String model;
	private String createdBy;
	private Date endDate;
	private Blob fingerPrintImage;
	private Blob volunteerImage;
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getFingerPrint() {
		return fingerPrint;
	}
	public void setFingerPrint(String fingerPrint) {
		this.fingerPrint = fingerPrint;
	}
	public String getManufacturer() {
		return manufacturer;
	}
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}
	public String getSerialNumber() {
		return serialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public Blob getFingerPrintImage() {
		return fingerPrintImage;
	}
	public void setFingerPrintImage(Blob fingerPrintImage) {
		this.fingerPrintImage = fingerPrintImage;
	}
	public Blob getVolunteerImage() {
		return volunteerImage;
	}
	public void setVolunteerImage(Blob volunteerImage) {
		this.volunteerImage = volunteerImage;
	}
	
	
	
}
