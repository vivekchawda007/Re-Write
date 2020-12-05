package com.rewrite.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rewrite.entity.RoleDetail;

@Repository
public interface RoleRepository extends JpaRepository<RoleDetail, String>{

}
