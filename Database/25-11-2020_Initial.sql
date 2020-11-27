CREATE USER rewrite WITH PASSWORD '34d99649';

CREATE SCHEMA rewrite AUTHORIZATION rewrite;

CREATE TABLE rewrite.films (title text, release date, awards text[]);

CREATE DATABASE rewrite;


CREATE OR REPLACE FUNCTION public.uuid_generate_v4()
 RETURNS uuid
 LANGUAGE c
 PARALLEL SAFE STRICT
AS '$libdir/uuid-ossp', $function$uuid_generate_v4$function$
;

CREATE TABLE public.role_detail (
	id varchar(40) NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar(100) NOT null,
	 PRIMARY KEY(id)
);



CREATE TABLE public.volunteer (
	id varchar(40) NOT NULL DEFAULT uuid_generate_v4(),
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	mobile_number varchar(100) NOT NULL,
	finger_print BYTEA NOT null,
	end_date timestamp not null,
	is_active bool default true,
	is_deleted bool default false,
	created_by varchar(100) not null,
	created_date timestamp not null DEFAULT now(),
	modified_by varchar(100) not null,
	modified_date timestamp not null DEFAULT now(),
	PRIMARY KEY(id),
	CONSTRAINT fk_created_by
      FOREIGN KEY(created_by) 
	  REFERENCES user_detail(id),
	  CONSTRAINT fk_modified_by
      FOREIGN KEY(modified_by) 
	  REFERENCES user_detail(id)
);



CREATE TABLE public.user_detail (
	id varchar(40) NOT NULL DEFAULT uuid_generate_v4(),
	user_name varchar(100) NOT null,
	password varchar(100) NOT null,
	is_new bool not null,
	role_id varchar(40) NOT null,
	is_active bool default true,
	is_deleted bool default false,
	created_by varchar(100),
	created_date timestamp not null DEFAULT now(),
	modified_by varchar(100),
	modified_date timestamp not null DEFAULT now(),
	PRIMARY KEY(id),
	CONSTRAINT fk_created_by
      FOREIGN KEY(created_by) 
	  REFERENCES user_detail(id),
	  CONSTRAINT fk_modified_by
      FOREIGN KEY(modified_by) 
	  REFERENCES user_detail(id),
	 CONSTRAINT fk_role_id
      FOREIGN KEY(role_id) 
	  REFERENCES role_detail(id)
);


CREATE TABLE public.activity (
	id varchar(40) NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar(100) NOT null,
	 PRIMARY KEY(id)


CREATE TABLE public.audit (
	id varchar(40) NOT NULL DEFAULT uuid_generate_v4(),
	activity_id varchar(100) NOT null,
	user_id varchar(100) NOT null,
	 PRIMARY KEY(id),
	 CONSTRAINT fk_activity_id
      FOREIGN KEY(activity_id) 
	  REFERENCES activity(id),
	   CONSTRAINT fk_user_id
      FOREIGN KEY(user_id) 
	  REFERENCES user_detail(id)  
);


