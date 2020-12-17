package com.rewrite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rewrite.entity.Volunteer;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, String> {
	
	@Query(value="select * from Volunteer where is_deleted = false order by modified_date desc", nativeQuery = true)
	List<Volunteer> getAllVolunteer(); 
	
	@Query(value="select count(*) from volunteer v where is_blocked = true and  is_deleted = false", nativeQuery = true)
	Integer getBlockedVolunteerCount();
	
	@Query(value="select count(*) from volunteer where  is_deleted = false", nativeQuery = true)
	Integer getTotalVolunteerCount();
	
	

}
