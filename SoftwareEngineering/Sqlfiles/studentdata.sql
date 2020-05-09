use se;
-- Create the table, this is aims data table
create table studentdata(roll varchar(100),name varchar(100),grades text,cgpa FLOAT); 

SET SQL_SAFE_UPDATES=0;
delete from studentdata;

INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ee10btech11001','Ram','{ \"EE3030\":7,\"EE2020\":8,\"CS4444\":8,\"CS3333\":10 }',9.2);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ee10btech11002','Kowshik','{ \"EE3030\":10,\"EE2020\":7,\"CS4444\":6,\"CS3333\":9 }',8.5);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ee10btech11003','Gautam','{ \"EE3030\":9,\"EE2020\":6,\"CS4444\":7,\"CS3333\":5 }',7.9);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ee10btech11004','Narayan','{ \"EE3030\":7,\"EE2020\":10,\"CS4444\":7,\"CS3333\":10 }',9.4);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ee10btech11005','Vageesh','{ \"EE3030\":8,\"EE2020\":7,\"CS4444\":9,\"CS3333\":10 }',8.3);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ee10btech11006','Rajesh','{ \"EE3030\":8,\"EE2020\":9,\"CS4444\":9,\"CS3333\":5 }',8.2);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ee10btech11007','Varun','{ \"EE3030\":10,\"EE2020\":6,\"CS4444\":7,\"CS3333\":5 }',9.1);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ee10btech11008','Pranav','{ \"EE3030\":5,\"EE2020\":8,\"CS4444\":9,\"CS3333\":5 }',7.5);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ee10btech11009','Madhav','{ \"EE3030\":10,\"EE2020\":6,\"CS4444\":9,\"CS3333\":10 }',8.8);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ee10btech11010','Aamir','{ \"EE3030\":5,\"EE2020\":6,\"CS4444\":10,\"CS3333\":7 }',8.4);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('cs10btech11001','Sahil','{ \"CS4444\":5,\"CS3333\":9,\"EE3030\":10 }',8.3);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('cs10btech11002','Adarsh','{ \"CS4444\":8,\"CS3333\":10 }',8.1);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('cs10btech11003','Srinivas','{ \"CS4444\":5,\"CS3333\":6 }',7.6);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('cs10btech11004','Venkat','{ \"CS4444\":8,\"CS3333\":9,\"PH2222\":8}',7.3);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('cs10btech11005','Byju','{ \"CS4444\":7,\"CS3333\":8 }',8.4);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('cs10btech11006','Ranjit','{ \"CS4444\":10,\"CS3333\":8 }',8.7);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('cs10btech11007','Vishnu','{ \"CS4444\":8,\"CS3333\":7 }',7.4);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('cs10btech11008','Sandhya','{ \"CS4444\":8,\"CS3333\":10,\"CH5555\":9,\"PH2222\":4 }',8.9);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('cs10btech11009','Raja','{ \"CS4444\":7,\"CS3333\":8 }',7.7);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('cs10btech11010','Vidhan','{ \"CS4444\":10,\"CS3333\":7 }',6.9);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('es10btech11001','Harshit','{ \"EE3030\":6,\"EE2020\":9,\"CS4444\":7,\"CS3333\":10,\"PH2222\":9,\"CH5555\":7 }',8.4);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('es10btech11002','Madhur','{ \"EE3030\":9,\"EE2020\":7,\"CS4444\":10,\"CS3333\":6,\"PH2222\":10,\"CH5555\":8 }',8.3);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('es10btech11003','Rahul','{ \"EE3030\":5,\"EE2020\":8,\"CS4444\":6,\"CS3333\":8,\"PH2222\":10,\"CH5555\":10 }',8.2);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('es10btech11004','Tarun','{ \"EE3030\":9,\"EE2020\":9,\"CS4444\":7,\"CS3333\":5,\"PH2222\":8,\"CH5555\":7 }',9.1);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('es10btech11005','Ramoju','{ \"EE2020\":8,\"CS4444\":7,\"CS3333\":5,\"PH2222\":7 }',6.4);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('es10btech11006','Aqib','{ \"EE2020\":10,\"CS4444\":8,\"CS3333\":10,\"PH2222\":5 }',7.8);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('es10btech11007','Arathi','{ \"EE2020\":5,\"CS4444\":8,\"CS3333\":6,\"PH2222\":6 }',8.4);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('es10btech11008','Paramjeet','{ \"EE2020\":7,\"CS4444\":6,\"CS3333\":8,\"PH2222\":9 }',8.7);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('es10btech11009','Ranveer','{ \"CS3333\":10,\"PH2222\":10,\"CH5555\":6 }',8.6);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('es10btech11010','Siddharth','{ \"CS3333\":8,\"PH2222\":9,\"CH5555\":7 }',9.1);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ch10btech11001','Aman','{ \"CS4444\":5,\"PH2222\":7,\"CH5555\":10 }',9.3);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ch10btech11002','Abbas','{ \"CS4444\":8,\"PH2222\":10,\"CH5555\":5 }',9.1);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ch10btech11003','Swapna','{ \"CS4444\":5,\"PH2222\":9,\"CH5555\":7 }',8.6);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ch10btech11004','Haveesh','{ \"EE3030\":7,\"CS3333\":10,\"CH5555\":7 }',8.9);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ch10btech11005','Meera','{ \"EE3030\":7,\"CS3333\":5,\"CH5555\":10 }',9.2);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ep10btech11001','Gopika','{ \"EE3030\":9,\"EE2020\":8,\"CS4444\":9,\"CS3333\":6,\"PH2222\":7 }',7.8);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ep10btech11002','Kartik','{ \"EE3030\":6,\"EE2020\":10,\"CS4444\":9,\"CS3333\":9,\"PH2222\":9 }',8.3);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ep10btech11003','Gokul','{ \"EE3030\":6,\"EE2020\":6,\"CS4444\":8,\"CS3333\":8,\"PH2222\":10 }',8.5);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ep10btech11004','Akash','{ \"EE2020\":8,\"CS3333\":5,\"PH2222\":7 }',7.1);
INSERT INTO studentdata (`roll`,`name`,`grades`,`cgpa`) VALUES ('ep10btech11005','Piyush','{ \"EE2020\":7,\"CS3333\":9,\"PH2222\":8 }',8.7);

select * from StudentData;
