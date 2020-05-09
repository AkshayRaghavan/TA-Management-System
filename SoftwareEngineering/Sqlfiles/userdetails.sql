use se;
-- Create the table, this is aims data table
create table userdetails(uname varchar(100),pwd varchar(100),type varchar(100),submitted boolean); 

SET SQL_SAFE_UPDATES=0;
delete from TeacherPreferences;

INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ee10btech11001','Ram','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ee10btech11002','Kowshik','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ee10btech11003','Gautam','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ee10btech11004','Narayan','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ee10btech11005','Vageesh','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ee10btech11006','Rajesh','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ee10btech11007','Varun','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ee10btech11008','Pranav','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ee10btech11009','Madhav','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ee10btech11010','Aamir','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('cs10btech11001','Sahil','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('cs10btech11002','Adarsh','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('cs10btech11003','Srinivas','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('cs10btech11004','Venkat','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('cs10btech11005','Byju','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('cs10btech11006','Ranjit','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('cs10btech11007','Vishnu','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('cs10btech11008','Sandhya','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('cs10btech11009','Raja','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('cs10btech11010','Vidhan','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('es10btech11001','Harshit','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('es10btech11002','Madhur','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('es10btech11003','Rahul','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('es10btech11004','Tarun','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('es10btech11005','Ramoju','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('es10btech11006','Aqib','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('es10btech11007','Arathi','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('es10btech11008','Paramjeet','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('es10btech11009','Ranveer','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('es10btech11010','Siddharth','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ch10btech11001','Aman','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ch10btech11002','Abbas','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ch10btech11003','Swapna','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ch10btech11004','Haveesh','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ch10btech11005','Meera','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ep10btech11001','Gopika','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ep10btech11002','Kartik','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ep10btech11003','Gokul','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ep10btech11004','Akash','student',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('ep10btech11005','Piyush','student',0);

INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('pvasudev','123','teacher',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('pskrao','123','teacher',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('harish','123','teacher',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('arvind','123','teacher',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('mraman','123','teacher',0);
INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('krishnan','123','teacher',0);

INSERT INTO userdetails (`uname`,`pwd`,`type`,`submitted`) VALUES ('admin','admin','admin',0);

update userdetails set pwd = '123';
select * from userdetails;