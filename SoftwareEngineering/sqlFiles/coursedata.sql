create table IF NOT EXISTS CourseData(cid varchar(100), PRIMARY KEY(cid));

SET SQL_SAFE_UPDATES=0;
delete from CourseData;

INSERT INTO CourseData(cid) VALUES ('CH5555');
INSERT INTO CourseData(cid) VALUES ('CS3333');
INSERT INTO CourseData(cid) VALUES ('PH2222');
INSERT INTO CourseData(cid) VALUES ('CS4444');
INSERT INTO CourseData(cid) VALUES ('EE3030');
INSERT INTO CourseData(cid) VALUES ('EE2020');

select * from CourseData;
