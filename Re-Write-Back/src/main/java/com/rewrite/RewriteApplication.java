package com.rewrite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class RewriteApplication {

	public static void main(String[] args) {
		SpringApplication.run(RewriteApplication.class, args);
	}
}
