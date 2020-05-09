use se;
-- Create the table if not created:-
-- create table StudentPreferences(uname varchar(100), cgpa decimal(4,2), pref varchar(1000), PRIMARY KEY(uname)); 

SET SQL_SAFE_UPDATES=0;
delete from studentpreferences;

INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ch10btech11001',9.30,'CH5555 PH2222 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ch10btech11002',9.10,'PH2222 CH5555 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ch10btech11003',8.60,'CS4444 CH5555 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ch10btech11004',8.90,'CS3333 CH5555 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ch10btech11005',9.20,'CH5555 EE3030 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('cs10btech11001',8.30,'CS4444 CS3333 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('cs10btech11002',8.10,'CS3333 CS4444 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('cs10btech11003',7.60,'CS4444 CS3333 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('cs10btech11004',7.30,'CS4444 CS3333 PH2222 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('cs10btech11005',8.40,'CS3333 CS4444 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('cs10btech11006',8.70,'CS4444 CS3333 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('cs10btech11007',7.40,'CS3333 CS4444 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('cs10btech11008',8.90,'PH2222 CS3333 CS4444 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('cs10btech11009',7.70,'CS4444 CS3333 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('cs10btech11010',6.90,'CS3333 CS4444 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ee10btech11001',9.20,'CS4444 CS3333 EE3030 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ee10btech11002',8.50,'CS4444 CS3333 EE2020 EE3030 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ee10btech11003',7.90,'CS4444 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ee10btech11004',9.40,'EE3030 CS3333 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ee10btech11005',8.30,'CS4444 EE3030 CS3333 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ee10btech11006',8.20,'CS3333 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ee10btech11007',9.10,'EE2020 EE3030 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ee10btech11008',7.50,'CS4444 EE3030 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ee10btech11009',8.80,'EE3030 CS4444 CS3333 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ee10btech11010',8.40,'CS4444 CS3333 EE2020 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ep10btech11001',7.80,'EE2020 EE3030 PH2222 CS4444 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ep10btech11002',8.30,'PH2222 EE2020 EE3030 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ep10btech11003',8.50,'EE2020 EE3030 PH2222 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ep10btech11004',7.10,'EE2020 PH2222 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('ep10btech11005',8.70,'CS3333 PH2222 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('es10btech11001',8.40,'CS4444 CS3333 PH2222 EE2020 EE3030 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('es10btech11002',8.30,'CS4444 CS3333 CH5555 EE3030 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('es10btech11003',8.20,'CH5555 PH2222 CS3333 EE3030 EE2020 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('es10btech11004',9.10,'PH2222 CS3333 CH5555 EE2020 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('es10btech11005',6.40,'CS3333 EE2020 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('es10btech11006',7.80,'CS4444 CS3333 PH2222 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('es10btech11007',8.40,'EE2020 PH2222 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('es10btech11008',8.70,'CS4444 CS3333 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('es10btech11009',8.60,'CS3333 CH5555 ');
INSERT INTO studentpreferences (`uname`,`cgpa`,`pref`) VALUES ('es10btech11010',9.10,'CS3333 PH2222 ');

select * from studentpreferences;