package com.rewrite.response;

import org.springframework.stereotype.Component;

@Component
public class Stats {

	private Integer blockedVolunteers;
	private Integer totalUsers;
	private Integer totalVolunteers;
	public Integer getBlockedVolunteers() {
		return blockedVolunteers;
	}
	public void setBlockedVolunteers(Integer blockedVolunteers) {
		this.blockedVolunteers = blockedVolunteers;
	}
	public Integer getTotalUsers() {
		return totalUsers;
	}
	public void setTotalUsers(Integer totalUsers) {
		this.totalUsers = totalUsers;
	}
	public Integer getTotalVolunteers() {
		return totalVolunteers;
	}
	public void setTotalVolunteers(Integer totalVolunteers) {
		this.totalVolunteers = totalVolunteers;
	}
	
	
	
}
