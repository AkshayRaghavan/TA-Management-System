# TA-Management-System
Software Engineering Project at IITH

## DATABASE SCHEMA -- PLEASE USE THE SAME NAMES IF YOU ARE USING THE BELOW TABLES:
UserDetails (uname: varchar(100), pwd : varchar(100), type: varchar(100), submitted: boolean );  
Note : type - student/teacher/admin  
StudentPreferences (uname :varchar(100), cgpa : decimal(4,2), pref: varchar(1000));  
Note: pref - space separated preferences listed in desc order of priority  

### FILL REST OF THE TABLES


## Run the following command in mysql before launching the server
create database se;
use se;
create table UserDetails(
uname: varchar(100), pwd : varchar(100), type: varchar(100), submitted: boolean, PRIMARY KEY(uname));
create table StudentPreferences(
uname: varchar(100), cgpa : decimal(4,2), pref: varchar(1000), PRIMARY KEY(uname));

## Add the other tables too
