CREATE TABLE Student(
	student_id INT PRIMARY KEY AUTO_INCREMENT,
	student_name VARCHAR(60),
	student_age INT
);

INSERT INTO Student(student_name, student_age) VALUES("Shubham verma", 21);


CREATE TABLE Insurance_Plan(
	plan_id INT PRIMARY KEY AUTO_INCREMENT,
	plan_name VARCHAR(255),
	plan_price INT
);

INSERT INTO Insurance_Plan(plan_name, plan_price) VALUES("Standard", 10);
INSERT INTO Insurance_Plan(plan_name, plan_price) VALUES("Premium", 300);

CREATE TABLE Insurance_Detail(
	plan_id INT,
	insurance_general INT DEFAULT 0,
	insurance_specialist INT DEFAULT 0,
	insurance_physiotherapy INT DEFAULT 0,
	insurance_dentist INT DEFAULT 0,
	insurance_chemo INT DEFAULT 0
);

INSERT INTO Insurance_Detail(plan_id, insurance_general) VALUES(1, 1);
INSERT INTO Insurance_Detail(plan_id, insurance_general, insurance_specialist) VALUES(2, 1, 1);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
