/***
 * Obj: dataHolding,
 * Stores Static String;
 */

var dataHolding =  {
	active_profile:{},
	dbinit:["CREATE TABLE IF NOT EXISTS `userlist` (\
    `id` integer NOT NULL,\
    `name` VARCHAR(30),\
    `surname` VARCHAR(30),\
    `email` VARCHAR(70),\
    `phone` VARCHAR(15) NOT NULL,\
    `unique_id` varchar(20),\
		`gender` char,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `institution` (\
    `id` integer NOT NULL,\
    `name` varchar(40) NOT NULL,\
    `longitute` float NOT NULL,\
    `latitude` float NOT NULL,\
    `address` varchar(100) NOT NULL,\
    `province` varchar(2) NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `access_log` (\
    `id` integer NOT NULL,\
    `client_id` interger NOT NULL,\
    `platform` integer NOT NULL,\
    `when` datetime NOT NULL,\
    `med_prof_id` integer NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `platforms` (\
    `id` integer NOT NULL,\
    `name` varchar(50) NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `activity_log` (\
    `id` integer NOT NULL,\
    `data` varchar(200) NOT NULL,\
    `when` datetime NOT NULL,\
    `userlist_id` integer NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `user_details` (\
    `date_of_birth` date,\
    `id_number` integer,\
    `occupation` varchar(15),\
    `address` varchar(80),\
    `work` varchar(15),\
    `ulist_id` integer NOT NULL,\
    `id` integer NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `user_med_history` (\
    `institute` integer NOT NULL,\
    `id` integer NOT NULL,\
    `date_of_visit` date NOT NULL,\
    `description` varchar(200),\
    `title` varchar(25) NOT NULL,\
    `med_professional_sign` integer,\
    `ulist_id` integer NOT NULL,\
    `diagnosis` varchar(300) NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `user_signatures` (\
    `id` integer NOT NULL,\
    `ulist_id` integer,\
    `key_file` varchar(100),\
    `nat_id_number` varchar(15) NOT NULL,\
    `nationality_key` varchar(4) NOT NULL,\
    `user_passcode` varchar(100) NOT NULL,\
    `salt_version` integer NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `medical_professional_list` (\
    `id` integer NOT NULL,\
    `licence_number` varchar(30) NOT NULL,\
    `specialisation_key` varchar(3) NOT NULL,\
    `reg_id` integer NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `medical_specialisation` (\
    `id` integer NOT NULL,\
    `key` varchar(3) NOT NULL,\
    `title` varchar(10) NOT NULL,\
    `description` varchar(150) NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `medical_signatures` (\
    `id` integer NOT NULL,\
    `ulist_id` integer NOT NULL,\
    `key_file` integer NOT NULL,\
    `expiration` date NOT NULL,\
    `validation` date NOT NULL,\
    `nationality_key` varchar(4) NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `relations` (\
    `id` integer NOT NULL,\
    `user_1` integer NOT NULL,\
    `user_2` integer NOT NULL,\
    `relation_description` varchar(100),\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `user_treatment` (\
    `id` integer NOT NULL,\
    `ulist_id` integer NOT NULL,\
    `umhistory_id` integer NOT NULL,\
    `med_description` varchar(100) NOT NULL,\
    `frequency` numeric NOT NULL,\
    `begin` datetime NOT NULL,\
    `end` datetime NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `bookings` (\
    `id` integer NOT NULL,\
    `booking` date NOT NULL,\
    `confirmed` char NOT NULL,\
    `type_` char NOT NULL,\
    `desc` varchar(100),\
    `location_id` id NOT NULL,\
    PRIMARY KEY (`id`)\
);"],
	q_user:["userlist","user_details","user_signatures",'relations'],
	q_med:['user_med_history',"user_treatment"],
	q_booking:['bookings','institution'],
	profile_count:0
}


