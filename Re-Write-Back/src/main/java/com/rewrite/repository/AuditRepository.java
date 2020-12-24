package com.rewrite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rewrite.entity.Audit;

@Repository
public interface AuditRepository extends JpaRepository<Audit, String>{
	@Query(value="select * from audit order by audit_time desc", nativeQuery = true)
	List<Audit> getAllAudits(); 
	
	@Query(value="select * from audit a \r\n" + 
			"\r\n" + 
			"\r\n" + 
			"left join user_detail ud on(a.user_id = ud.id)\r\n" + 
			"\r\n" + 
			"\r\n" + 
			"where a.activity_id IN('8','9','14') and ud.role_id = '2' order by a.audit_time desc", nativeQuery = true)
	List<Audit> getAllRegistrarAudit(); 
}
