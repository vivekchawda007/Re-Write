package com.rewrite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rewrite.entity.UserDetail;

@Repository
public interface UserDetailRepository extends JpaRepository<UserDetail, String> {
	
	@Query(value="select * from User_detail where is_deleted = false AND user_name =:userName AND password =:password", nativeQuery = true)
	public List<UserDetail> findByUserNameAndPassword1(@Param("userName") String userName, @Param("password") String password);
	
	@Query(value="select * from User_detail where is_deleted = false order by modified_date desc", nativeQuery = true)
	List<UserDetail> getAllUser(); 
	
	@Query(value="select count(*) from user_detail where  is_deleted = false", nativeQuery = true)
	Integer getTotalUserCount();
	
}
