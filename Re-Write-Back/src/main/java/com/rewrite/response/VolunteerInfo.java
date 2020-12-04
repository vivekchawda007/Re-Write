package com.rewrite.response;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "firstName", "lastName", "mobileNumber", "address", "fingerPrint", "manufacturer", "serialNumber",
		"model", "createdBy", "endDate", "fingerPrintImage", "volunteerImage" })
public class VolunteerInfo {

	private String volunteerId;
	@JsonProperty("firstName")
	private String firstName;
	@JsonProperty("lastName")
	private String lastName;
	@JsonProperty("mobileNumber")
	private String mobileNumber;
	@JsonProperty("address")
	private String address;
	@JsonProperty("fingerPrint")
	private String fingerPrint;
	@JsonProperty("manufacturer")
	private String manufacturer;
	@JsonProperty("serialNumber")
	private String serialNumber;
	@JsonProperty("model")
	private String model;
	@JsonProperty("createdBy")
	private String createdBy;
	@JsonProperty("endDate")
	private Date endDate;
	@JsonProperty("fingerPrintImage")
	private String fingerPrintImage;
	@JsonProperty("volunteerImage")
	private String volunteerImage;
	private Boolean isNew;
	public Boolean getIsNew() {
		return isNew;
	}

	public void setIsNew(Boolean isNew) {
		this.isNew = isNew;
	}

	public String getVolunteerId() {
		return volunteerId;
	}

	public void setVolunteerId(String volunteerId) {
		this.volunteerId = volunteerId;
	}

	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<String, Object>();

	@JsonProperty("firstName")
	public String getFirstName() {
		return firstName;
	}

	@JsonProperty("firstName")
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@JsonProperty("lastName")
	public String getLastName() {
		return lastName;
	}

	@JsonProperty("lastName")
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@JsonProperty("mobileNumber")
	public String getMobileNumber() {
		return mobileNumber;
	}

	@JsonProperty("mobileNumber")
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	@JsonProperty("address")
	public String getAddress() {
		return address;
	}

	@JsonProperty("address")
	public void setAddress(String address) {
		this.address = address;
	}

	@JsonProperty("fingerPrint")
	public String getFingerPrint() {
		return fingerPrint;
	}

	@JsonProperty("fingerPrint")
	public void setFingerPrint(String fingerPrint) {
		this.fingerPrint = fingerPrint;
	}

	@JsonProperty("manufacturer")
	public String getManufacturer() {
		return manufacturer;
	}

	@JsonProperty("manufacturer")
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	@JsonProperty("serialNumber")
	public String getSerialNumber() {
		return serialNumber;
	}

	@JsonProperty("serialNumber")
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	@JsonProperty("model")
	public String getModel() {
		return model;
	}

	@JsonProperty("model")
	public void setModel(String model) {
		this.model = model;
	}

	@JsonProperty("createdBy")
	public String getCreatedBy() {
		return createdBy;
	}

	@JsonProperty("createdBy")
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	@JsonProperty("endDate")
	public Date getEndDate() {
		return endDate;
	}

	@JsonProperty("endDate")
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	@JsonProperty("fingerPrintImage")
	public String getFingerPrintImage() {
		return fingerPrintImage;
	}

	@JsonProperty("fingerPrintImage")
	public void setFingerPrintImage(String fingerPrintImage) {
		this.fingerPrintImage = fingerPrintImage;
	}

	@JsonProperty("volunteerImage")
	public String getVolunteerImage() {
		return volunteerImage;
	}

	@JsonProperty("volunteerImage")
	public void setVolunteerImage(String volunteerImage) {
		this.volunteerImage = volunteerImage;
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