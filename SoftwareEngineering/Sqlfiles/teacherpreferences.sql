use se;
-- Create the table if not created:-
-- create table TeacherPreferences(cid char(6), instname varchar(100), nta integer, pref varchar(1000),PRIMARY KEY(cid));  

SET SQL_SAFE_UPDATES=0;
delete from TeacherPreferences;

INSERT INTO TeacherPreferences (`cid`,`instname`,`nta`,`pref`) VALUES ('EE3030','pvasudev',5,'ee10btech11002 ee10btech11007');
INSERT INTO TeacherPreferences (`cid`,`instname`,`nta`,`pref`) VALUES ('EE2020','pskrao',7,'ee10btech11004');
INSERT INTO TeacherPreferences (`cid`,`instname`,`nta`,`pref`) VALUES ('CS4444','harish',8,'ee10btech11010 cs10btech11006 cs10btech11010');
INSERT INTO TeacherPreferences (`cid`,`instname`,`nta`,`pref`) VALUES ('CS3333','arvind',10,'ee10btech11001 ee10btech11005 cs10btech11002 cs10btech11008');
INSERT INTO TeacherPreferences (`cid`,`instname`,`nta`,`pref`) VALUES ('PH2222','mraman',5,'es10btech11002 es10btech11009');
INSERT INTO TeacherPreferences (`cid`,`instname`,`nta`,`pref`) VALUES ('CH5555','krishnan',4,'es10btech11003');

select * from TeacherPreferences;
