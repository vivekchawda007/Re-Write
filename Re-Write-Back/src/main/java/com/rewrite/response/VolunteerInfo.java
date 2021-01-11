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
	private String documentNumber;
	private Integer documentType;
	private Date birthDate;
	private Integer gender;
	private boolean isBlocked;
	private String blockId;
	
	private String studyNumber;
	private String remarks;
	private Date blockStartDate;
	private Date blockEndDate;
	
	
	public String getBlockId() {
		return blockId;
	}

	public void setBlockId(String blockId) {
		this.blockId = blockId;
	}

	public Date getBlockStartDate() {
		return blockStartDate;
	}

	public void setBlockStartDate(Date blockStartDate) {
		this.blockStartDate = blockStartDate;
	}

	public boolean isBlocked() {
		return isBlocked;
	}

	public void setBlocked(boolean isBlocked) {
		this.isBlocked = isBlocked;
	}

	public Date getBlockEndDate() {
		return blockEndDate;
	}

	public void setBlockEndDate(Date blockEndDate) {
		this.blockEndDate = blockEndDate;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Boolean getIsNew() {
		return isNew;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getDocumentNumber() {
		return documentNumber;
	}

	public void setDocumentNumber(String documentNumber) {
		this.documentNumber = documentNumber;
	}

	public Integer getDocumentType() {
		return documentType;
	}

	public void setDocumentType(Integer documentType) {
		this.documentType = documentType;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public Integer getGender() {
		return gender;
	}

	public void setGender(Integer gender) {
		this.gender = gender;
	}

	public String getStudyNumber() {
		return studyNumber;
	}

	public void setStudyNumber(String studyNumber) {
		this.studyNumber = studyNumber;
	}

	public void setAdditionalProperties(Map<String, Object> additionalProperties) {
		this.additionalProperties = additionalProperties;
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