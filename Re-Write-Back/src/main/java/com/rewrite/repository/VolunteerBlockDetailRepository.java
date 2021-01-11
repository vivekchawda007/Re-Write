package com.rewrite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rewrite.entity.UserDetail;
import com.rewrite.entity.VolunteerBlockDetail;

@Repository
public interface VolunteerBlockDetailRepository extends JpaRepository<VolunteerBlockDetail, String> {
	
	@Query(value="select * from volunteer_block_detail where is_deleted = false AND volunteer_id =:volunteerId order by created_date desc limit 1", nativeQuery = true)
	public VolunteerBlockDetail findByVolunteerId(@Param("volunteerId") String volunteerId);
}
