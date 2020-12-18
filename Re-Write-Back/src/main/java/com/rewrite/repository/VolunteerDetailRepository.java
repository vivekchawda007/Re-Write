package com.rewrite.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rewrite.entity.VolunteerDetail;

@Repository
public interface VolunteerDetailRepository extends JpaRepository<VolunteerDetail, Long> {
	
	public VolunteerDetail findByVolunteerId(@Param("volunteerId") String volunteerId);
	

}
