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
@JsonPropertyOrder({ "template1", "template2", "licstr", "templateFormat" })
public class MatchFingerPrintRequest {

	@JsonProperty("template1")
	private String template1;
	@JsonProperty("template2")
	private String template2;
	@JsonProperty("licstr")
	private String licstr;
	@JsonProperty("templateFormat")
	private String templateFormat;
	@JsonIgnore
	private Map<String, Object> additionalProperties = new HashMap<String, Object>();

	@JsonProperty("template1")
	public String getTemplate1() {
		return template1;
	}

	@JsonProperty("template1")
	public void setTemplate1(String template1) {
		this.template1 = template1;
	}

	@JsonProperty("template2")
	public String getTemplate2() {
		return template2;
	}

	@JsonProperty("template2")
	public void setTemplate2(String template2) {
		this.template2 = template2;
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
