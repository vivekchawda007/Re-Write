package com.rewrite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rewrite.entity.Audit;
import com.rewrite.entity.UserDetail;

@Repository
public interface AuditRepository extends JpaRepository<Audit, String>{
	@Query(value="select * from audit order by audit_time desc", nativeQuery = true)
	List<Audit> getAllAudits(); 
}
