package com.rewrite.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.rewrite.entity.VolunteerDetail;

@Repository
public interface VolunteerRepository extends JpaRepository<VolunteerDetail, String> {
	

}
