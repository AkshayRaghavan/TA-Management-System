# TA-Management-System
Software Engineering Project at IITH

## DATABASE SCHEMA -- PLEASE USE THE SAME NAMES IF YOU ARE USING THE BELOW TABLES:
UserDetails (uname varchar(100), pwd varchar(100), type varchar(100), submitted boolean)  
StudentPreferences (uname varchar(100), cgpa decimal(4,2), pref varchar(1000))
TeacherPreferences (cid char(6), instname varchar(30), nta int, pref varchar(1000))  
studentdata (roll varchar(100),name varchar(100),grades text,cgpa FLOAT)
final_allocation (course char(6),list_of_TAs text)

Note: 
type - student/teacher/admin
pref - space separated preferences listed in desc order of priority 
grades - a JSON string containing grades of all the courses done by that student. Eg: {"CS3333":8,"EE3030":10,"CH555":7}
studentdata table is assumed to be have the grades of the students. This is required for the allocation-algorithm to run.
### FILL REST OF THE TABLES


## Run the following command in mysql before launching the server
create database se;  
use se;  
create table UserDetails(  
uname varchar(100), pwd varchar(100), type varchar(100), submitted boolean, PRIMARY KEY(uname));  
create table StudentPreferences(  
uname varchar(100), cgpa decimal(4,2), pref varchar(1000), PRIMARY KEY(uname));  
create table TeacherPreferences(  
cid char(6), instname varchar(100), nta integer, pref varchar(1000), PRIMARY KEY(cid));  

create table studentdata(roll varchar(100),name varchar(100),grades text,cgpa FLOAT); 

create table final_allocation(course char(6),list_of_TAs text);
## Add the other tables too  
