package com.rewrite.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rewrite.repository.UserDetailRepository;
import com.rewrite.repository.VolunteerRepository;
import com.rewrite.response.Stats;

@Service
public class DashboardService {

	@Autowired
	VolunteerRepository volunteerRepository;
	@Autowired
	UserDetailRepository userDetailRepository;
	
	public Stats getStats() {
		Stats stats = new Stats();
		stats.setBlockedVolunteers(volunteerRepository.getBlockedVolunteerCount());
		stats.setTotalVolunteers(volunteerRepository.getTotalVolunteerCount());
		stats.setTotalUsers(userDetailRepository.getTotalUserCount());
		return stats;
	}

}
