INSERT INTO USERLOGIN(ID,NAME,password) VALUES(1,'root@qq.com','123456');
INSERT INTO USERLOGIN(ID,NAME,password) VALUES(2,'liuliang@qq.com','123456');
INSERT INTO USERLOGIN(ID,NAME,password) VALUES(3,'lihang@qq.com','123456');
INSERT INTO USERLOGIN(ID,NAME,password) VALUES(4,'zsy@qq.com','123456');

INSERT INTO COLLEGE(ID,name) VALUES(1,'计算机科学与技术学院');
INSERT INTO COLLEGE(ID,name) VALUES(2,'外国语学院');
INSERT INTO COLLEGE(ID,name) VALUES(3,'土木学院');
INSERT INTO COLLEGE(ID,name) VALUES(4,'材料学院');
INSERT INTO MAJOR(ID,name,college_id) VALUES(1,'软件专业',1);
INSERT INTO MAJOR(ID,name,college_id) VALUES(2,'英语专业',2);
INSERT INTO MAJOR(ID,name,college_id) VALUES(3,'土木专业',3);
INSERT INTO MAJOR(ID,name,college_id) VALUES(4,'材料专业',4);
INSERT INTO STUDENT(ID,phone,address,birth,grade,name,no,sex,college_id,major_id) VALUES(1,'18728532222','四川省绵阳市1','1997-08-24','2016','lihang','512016001','Male',1,1);
INSERT INTO STUDENT(ID,phone,address,birth,grade,name,no,sex,college_id,major_id) VALUES(2,'18728533333','四川省绵阳市2','1998-02-16','2016','liuliang','512016002','Male',2,2);
INSERT INTO STUDENT(ID,phone,address,birth,grade,name,no,sex,college_id,major_id) VALUES(3,'18728534444','四川省绵阳市3','1998-10-20','2016','liaojiajun','512016003','Male',3,3);
INSERT INTO STUDENT(ID,phone,address,birth,grade,name,no,sex,college_id,major_id) VALUES(4,'18728535555','四川省绵阳市4','1998-06-30','2016','zhousiyi','512016004','Female',4,4);
<<<<<<< HEAD

INSERT INTO STUDENT(ID,phone,address,birth,grade,name,no,sex,college_id,major_id) VALUES(5,'18728532224','四川省绵阳市1','1997-08-24','2016','lihang','512016001','Male',1,1);
INSERT INTO STUDENT(ID,phone,address,birth,grade,name,no,sex,college_id,major_id) VALUES(6,'18728533334','四川省绵阳市2','1998-02-16','2016','liuliang','512016002','Male',2,2);
INSERT INTO STUDENT(ID,phone,address,birth,grade,name,no,sex,college_id,major_id) VALUES(7,'18728534445','四川省绵阳市3','1998-10-20','2016','liaojiajun','512016003','Male',3,3);
INSERT INTO STUDENT(ID,phone,address,birth,grade,name,no,sex,college_id,major_id) VALUES(8,'18728535556','四川省绵阳市4','1998-06-30','2016','zhousiyi','512016004','Female',4,4);


INSERT INTO TEACHER(ID,name,college_id,birth,position) VALUES(1,'刘亮',1,'1997-08-24','教授');
INSERT INTO TEACHER(ID,name,college_id,birth,position) VALUES(2,'周思艺',2,'1998-02-16','副教授');
INSERT INTO TEACHER(ID,name,college_id,birth,position) VALUES(3,'李航',3,'1998-10-20','教授父亲');
INSERT INTO TEACHER(ID,name,college_id,birth,position) VALUES(4,'廖家俊',4,'1998-06-30','教授叔叔');
=======
INSERT INTO TEACHER(ID,name,college_id,birth,position,sex) VALUES(1,'刘亮',1,'1997-08-24','教授','男');
INSERT INTO TEACHER(ID,name,college_id,birth,position,sex) VALUES(2,'周思艺',2,'1998-02-16','副教授','女');
INSERT INTO TEACHER(ID,name,college_id,birth,position,sex) VALUES(3,'李航',3,'1998-10-20','教授父亲','男');
INSERT INTO TEACHER(ID,name,college_id,birth,position,sex) VALUES(4,'廖家俊',4,'1998-06-30','教授叔叔','男');
>>>>>>> ad58492f5009e5cd03950e11221eedb6d833b613


INSERT INTO COURSE(ID,CREDIT,NAME,COLLEGE_ID) VALUES(1,3,'JAVAEE',3);
INSERT INTO COURSE(ID,CREDIT,NAME,COLLEGE_ID) VALUES(2,4,'数据库',1);
INSERT INTO COURSE(ID,CREDIT,NAME,COLLEGE_ID) VALUES(3,5,'数据结构',2);
INSERT INTO COURSE(ID,CREDIT,NAME,COLLEGE_ID) VALUES(4,2,'C语言',4);
INSERT INTO COURSESTUDENT(ID,SCORE,COURSE_ID,STUDENT_ID) VALUES(1,80,2,1);
INSERT INTO COURSESTUDENT(ID,SCORE,COURSE_ID,STUDENT_ID) VALUES(2,90,1,2);
INSERT INTO COURSESTUDENT(ID,SCORE,COURSE_ID,STUDENT_ID) VALUES(3,100,3,4);
INSERT INTO COURSESTUDENT(ID,SCORE,COURSE_ID,STUDENT_ID) VALUES(4,60,4,3);
INSERT INTO CLASSES(ID,NAME,MAJOR_ID) VALUES(1,'1班',3);
INSERT INTO CLASSES(ID,NAME,MAJOR_ID) VALUES(2,'4班',1);
INSERT INTO CLASSES(ID,NAME,MAJOR_ID) VALUES(3,'3班',2);
INSERT INTO CLASSES(ID,NAME,MAJOR_ID) VALUES(4,'2班',4);
INSERT INTO COURSETEACHER(ID,COURSE_ID,TEACHER_ID) VALUES(1,2,1);
INSERT INTO COURSETEACHER(ID,COURSE_ID,TEACHER_ID) VALUES(2,1,2);
INSERT INTO COURSETEACHER(ID,COURSE_ID,TEACHER_ID) VALUES(3,3,4);
INSERT INTO COURSETEACHER(ID,COURSE_ID,TEACHER_ID) VALUES(4,4,3);

