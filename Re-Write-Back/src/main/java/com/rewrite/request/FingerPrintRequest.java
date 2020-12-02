
package com.rewrite.request;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "Timeout", "Quality", "licstr", "templateFormat" })
public class FingerPrintRequest {

	@JsonProperty("Timeout")
	private Integer Timeout;
	@JsonProperty("Quality")
	private Integer Quality;
	@JsonProperty("licstr")
	private String licstr;
	@JsonProperty("templateFormat")
	private String templateFormat;
	public Integer getTimeout() {
		return Timeout;
	}
	public void setTimeout(Integer timeout) {
		Timeout = timeout;
	}
	public Integer getQuality() {
		return Quality;
	}
	public void setQuality(Integer quality) {
		Quality = quality;
	}
	public String getLicstr() {
		return licstr;
	}
	public void setLicstr(String licstr) {
		this.licstr = licstr;
	}
	public String getTemplateFormat() {
		return templateFormat;
	}
	public void setTemplateFormat(String templateFormat) {
		this.templateFormat = templateFormat;
	}
	

}