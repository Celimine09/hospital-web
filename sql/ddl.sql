CREATE DATABASE `zlshglsz_test_jm_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- zlshglsz_test_jm_db.Building definition

CREATE TABLE `Building` (
  `building_name` varchar(100) NOT NULL,
  `b_id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`b_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- zlshglsz_test_jm_db.Patient definition

CREATE TABLE `Patient` (
  `fname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `p_id` int unsigned NOT NULL AUTO_INCREMENT,
  `lname` varchar(100) NOT NULL,
  `phone_no` text NOT NULL,
  `gender` enum('M','F') NOT NULL,
  `birthday` date NOT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- zlshglsz_test_jm_db.RoomType definition

CREATE TABLE `RoomType` (
  `rt_id` int unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(100) NOT NULL,
  PRIMARY KEY (`rt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- zlshglsz_test_jm_db.StaffRole definition

CREATE TABLE `StaffRole` (
  `role_id` int unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- zlshglsz_test_jm_db.Staff definition

CREATE TABLE `Staff` (
  `s_id` int unsigned NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role_id` int unsigned DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `lname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`s_id`),
  KEY `Staff_StaffRole_FK` (`role_id`),
  CONSTRAINT `Staff_StaffRole_FK` FOREIGN KEY (`role_id`) REFERENCES `StaffRole` (`role_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- zlshglsz_test_jm_db.MedicalHistory definition

CREATE TABLE `MedicalHistory` (
  `h_id` int unsigned NOT NULL AUTO_INCREMENT,
  `patient_id` int unsigned NOT NULL,
  `doctor_id` int unsigned NOT NULL,
  `simple_diagonosis` varchar(100) NOT NULL,
  `diagonosis_desc` text,
  `admission_date` date NOT NULL,
  `discharge_date` date DEFAULT NULL,
  PRIMARY KEY (`h_id`),
  KEY `MedicalHistory_Staff_FK` (`patient_id`),
  KEY `MedicalHistory_Staff_FK_1` (`doctor_id`),
  CONSTRAINT `MedicalHistory_Patient_FK` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`p_id`) ON UPDATE CASCADE,
  CONSTRAINT `MedicalHistory_Staff_FK_1` FOREIGN KEY (`doctor_id`) REFERENCES `Staff` (`s_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- zlshglsz_test_jm_db.Room definition

CREATE TABLE `Room` (
  `room_id` int unsigned NOT NULL AUTO_INCREMENT,
  `patient_id` int unsigned DEFAULT NULL,
  `roomtype_id` int unsigned NOT NULL,
  `staff_id` int unsigned DEFAULT NULL,
  `building_id` int unsigned NOT NULL,
  PRIMARY KEY (`room_id`),
  KEY `Room_Patient_FK` (`patient_id`),
  KEY `Room_Staff_FK` (`staff_id`),
  KEY `Room_RoomType_FK` (`roomtype_id`),
  KEY `Room_Building_FK` (`building_id`),
  CONSTRAINT `Room_Building_FK` FOREIGN KEY (`building_id`) REFERENCES `Building` (`b_id`) ON UPDATE CASCADE,
  CONSTRAINT `Room_Patient_FK` FOREIGN KEY (`patient_id`) REFERENCES `Patient` (`p_id`) ON UPDATE CASCADE,
  CONSTRAINT `Room_RoomType_FK` FOREIGN KEY (`roomtype_id`) REFERENCES `RoomType` (`rt_id`) ON UPDATE CASCADE,
  CONSTRAINT `Room_Staff_FK` FOREIGN KEY (`staff_id`) REFERENCES `Staff` (`s_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;