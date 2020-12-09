package com.rewrite.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rewrite.entity.Activity;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, String>{
	
	
}
