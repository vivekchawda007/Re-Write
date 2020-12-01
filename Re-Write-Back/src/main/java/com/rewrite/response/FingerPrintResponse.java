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
@JsonPropertyOrder({ "ErrorCode", "Manufacturer", "Model", "SerialNumber", "ImageWidth", "ImageHeight", "ImageDPI",
		"ImageQuality", "NFIQ", "ImageDataBase64", "BMPBase64" })
public class FingerPrintResponse {

	@JsonProperty("ErrorCode")
	private Integer ErrorCode;
	@JsonProperty("Manufacturer")
	private String manufacturer;
	@JsonProperty("Model")
	private String model;
	@JsonProperty("SerialNumber")
	private String serialNumber;
	@JsonProperty("ImageWidth")
	private Integer imageWidth;
	@JsonProperty("ImageHeight")
	private Integer imageHeight;
	@JsonProperty("ImageDPI")
	private Integer imageDPI;
	@JsonProperty("ImageQuality")
	private Integer imageQuality;
	@JsonProperty("NFIQ")
	private Integer nFIQ;
	@JsonProperty("ImageDataBase64")
	private Object imageDataBase64;
	@JsonProperty("BMPBase64")
	private String bMPBase64;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<String, Object>();

	@JsonProperty("ErrorCode")
	public Integer getErrorCode() {
		return ErrorCode;
	}

	@JsonProperty("ErrorCode")
	public void setErrorCode(Integer errorCode) {
		this.ErrorCode = errorCode;
	}

	@JsonProperty("Manufacturer")
	public String getManufacturer() {
		return manufacturer;
	}

	@JsonProperty("Manufacturer")
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	@JsonProperty("Model")
	public String getModel() {
		return model;
	}

	@JsonProperty("Model")
	public void setModel(String model) {
		this.model = model;
	}

	@JsonProperty("SerialNumber")
	public String getSerialNumber() {
		return serialNumber;
	}

	@JsonProperty("SerialNumber")
	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	@JsonProperty("ImageWidth")
	public Integer getImageWidth() {
		return imageWidth;
	}

	@JsonProperty("ImageWidth")
	public void setImageWidth(Integer imageWidth) {
		this.imageWidth = imageWidth;
	}

	@JsonProperty("ImageHeight")
	public Integer getImageHeight() {
		return imageHeight;
	}

	@JsonProperty("ImageHeight")
	public void setImageHeight(Integer imageHeight) {
		this.imageHeight = imageHeight;
	}

	@JsonProperty("ImageDPI")
	public Integer getImageDPI() {
		return imageDPI;
	}

	@JsonProperty("ImageDPI")
	public void setImageDPI(Integer imageDPI) {
		this.imageDPI = imageDPI;
	}

	@JsonProperty("ImageQuality")
	public Integer getImageQuality() {
		return imageQuality;
	}

	@JsonProperty("ImageQuality")
	public void setImageQuality(Integer imageQuality) {
		this.imageQuality = imageQuality;
	}

	@JsonProperty("NFIQ")
	public Integer getNFIQ() {
		return nFIQ;
	}

	@JsonProperty("NFIQ")
	public void setNFIQ(Integer nFIQ) {
		this.nFIQ = nFIQ;
	}

	@JsonProperty("ImageDataBase64")
	public Object getImageDataBase64() {
		return imageDataBase64;
	}

	@JsonProperty("ImageDataBase64")
	public void setImageDataBase64(Object imageDataBase64) {
		this.imageDataBase64 = imageDataBase64;
	}

	@JsonProperty("BMPBase64")
	public String getBMPBase64() {
		return bMPBase64;
	}

	@JsonProperty("BMPBase64")
	public void setBMPBase64(String bMPBase64) {
		this.bMPBase64 = bMPBase64;
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