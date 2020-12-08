package com.rewrite.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "ErrorCode", "Manufacturer", "Model", "SerialNumber", "ImageWidth", "ImageHeight", "ImageDPI",
		"ImageQuality", "NFIQ", "ImageDataBase64", "BMPBase64" })
public class FingerPrintRequest {

	@JsonProperty("ErrorCode")
	private Integer ErrorCode;
	@JsonProperty("Manufacturer")
	private String Manufacturer;
	@JsonProperty("Model")
	private String Model;
	@JsonProperty("SerialNumber")
	private String SerialNumber;
	@JsonProperty("ImageWidth")
	private Integer ImageWidth;
	@JsonProperty("ImageHeight")
	private Integer ImageHeight;
	@JsonProperty("ImageDPI")
	private Integer ImageDPI;
	@JsonProperty("ImageQuality")
	private Integer ImageQuality;
	@JsonProperty("NFIQ")
	private Integer NFIQ;
	@JsonProperty("ImageDataBase64")
	private Object ImageDataBase64;
	@JsonProperty("BMPBase64")
	private String BMPBase64;
	@JsonProperty("TemplateBase64")
	private String TemplateBase64;
	
	public String getTemplateBase64() {
		return TemplateBase64;
	}
	public void setTemplateBase64(String templateBase64) {
		TemplateBase64 = templateBase64;
	}
	public Integer getErrorCode() {
		return ErrorCode;
	}
	public void setErrorCode(Integer errorCode) {
		ErrorCode = errorCode;
	}
	public String getManufacturer() {
		return Manufacturer;
	}
	public void setManufacturer(String manufacturer) {
		Manufacturer = manufacturer;
	}
	public String getModel() {
		return Model;
	}
	public void setModel(String model) {
		Model = model;
	}
	public String getSerialNumber() {
		return SerialNumber;
	}
	public void setSerialNumber(String serialNumber) {
		SerialNumber = serialNumber;
	}
	public Integer getImageWidth() {
		return ImageWidth;
	}
	public void setImageWidth(Integer imageWidth) {
		ImageWidth = imageWidth;
	}
	public Integer getImageHeight() {
		return ImageHeight;
	}
	public void setImageHeight(Integer imageHeight) {
		ImageHeight = imageHeight;
	}
	public Integer getImageDPI() {
		return ImageDPI;
	}
	public void setImageDPI(Integer imageDPI) {
		ImageDPI = imageDPI;
	}
	public Integer getImageQuality() {
		return ImageQuality;
	}
	public void setImageQuality(Integer imageQuality) {
		ImageQuality = imageQuality;
	}
	public Integer getNFIQ() {
		return NFIQ;
	}
	public void setNFIQ(Integer nFIQ) {
		NFIQ = nFIQ;
	}
	public Object getImageDataBase64() {
		return ImageDataBase64;
	}
	public void setImageDataBase64(Object imageDataBase64) {
		ImageDataBase64 = imageDataBase64;
	}
	public String getBMPBase64() {
		return BMPBase64;
	}
	public void setBMPBase64(String bMPBase64) {
		BMPBase64 = bMPBase64;
	}



}