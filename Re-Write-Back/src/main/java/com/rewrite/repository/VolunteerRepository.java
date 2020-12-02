package com.rewrite.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rewrite.entity.Volunteer;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, String> {
	

}
