
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
	private Integer timeout;
	@JsonProperty("Quality")
	private Integer quality;
	@JsonProperty("licstr")
	private String licstr;
	@JsonProperty("templateFormat")
	private String templateFormat;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<String, Object>();

	@JsonProperty("Timeout")
	public Integer getTimeout() {
		return timeout;
	}

	@JsonProperty("Timeout")
	public void setTimeout(Integer timeout) {
		this.timeout = timeout;
	}

	@JsonProperty("Quality")
	public Integer getQuality() {
		return quality;
	}

	@JsonProperty("Quality")
	public void setQuality(Integer quality) {
		this.quality = quality;
	}

	@JsonProperty("licstr")
	public String getLicstr() {
		return licstr;
	}

	@JsonProperty("licstr")
	public void setLicstr(String licstr) {
		this.licstr = licstr;
	}

	@JsonProperty("templateFormat")
	public String getTemplateFormat() {
		return templateFormat;
	}

	@JsonProperty("templateFormat")
	public void setTemplateFormat(String templateFormat) {
		this.templateFormat = templateFormat;
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