# TA-Management-System
Software Engineering Project at IITH

## DATABASE SCHEMA -- PLEASE USE THE SAME NAMES IF YOU ARE USING THE BELOW TABLES:
UserDetails (uname: varchar(100), pwd : varchar(100), type: varchar(100), submitted: boolean);  
Note : type - student/teacher/admin  
StudentPreferences (uname :varchar(100), cgpa: decimal(4,2), pref: varchar(1000));  
TeacherPreferences (cid :char(6), instname: varchar(30), nta: int, pref: varchar(1000));  
Note: pref - space separated preferences listed in desc order of priority  

### FILL REST OF THE TABLES
