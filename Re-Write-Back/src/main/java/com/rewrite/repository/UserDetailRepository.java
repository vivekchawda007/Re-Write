package com.rewrite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rewrite.entity.UserDetail;

@Repository
public interface UserDetailRepository extends JpaRepository<UserDetail, String> {
	
	public List<UserDetail> findByUserNameAndPassword(@Param("userName") String userName, @Param("password") String password);

}
