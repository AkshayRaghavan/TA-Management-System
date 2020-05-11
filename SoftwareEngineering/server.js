var express = require('express')
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var json2html = require('node-json2html');
var app = express()

const UserDetails = 'UserDetails';
const StudentPreferences = 'StudentPreferences';
const TeacherPreferences = 'TeacherPreferences';
const FinalAllocation = 'FinalAllocation';
let isAlgoRun = false;

var template = function(msg){
	var retval = fs.readFileSync('loginPortal/template.html');
	return retval.toString().replace('####',msg);
}

var con = mysql.createConnection({
	host: "localhost",
	user : "root",
	password: "akshMysql12",
	database: "se"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

var sql = "create table IF NOT EXISTS UserDetails(uname varchar(100), pwd varchar(100), type varchar(100), submitted boolean, PRIMARY KEY(uname))";
con.query(sql, function(err,result){
	if(err) throw err;
	console.log("UserDetails Table created/success");
});

sql = "create table IF NOT EXISTS StudentPreferences(uname varchar(100), cgpa DECIMAL(4,2), pref varchar(1000), PRIMARY KEY(uname))";
con.query(sql, function(err,result){
	if(err) throw err;
	console.log("StudentPreferences Table created/success");
});

sql = "create table IF NOT EXISTS TeacherPreferences(cid char(6), instname varchar(30), nta INTEGER, pref varchar(100), PRIMARY KEY(cid))";
con.query(sql, function(err,result){
	if(err) throw err;
	console.log("TeacherPreferences Table created/success");
});

sql = "create table IF NOT EXISTS FinalAllocation(cid char(6), instname varchar(30), talist varchar(1000), PRIMARY KEY(cid))";
con.query(sql, function(err,result){
	if(err) throw err;
	console.log("FinalAllocation Table created/success");
});

sql = "create table IF NOT EXISTS Tasks(tna varchar(100), task varchar(100), PRIMARY KEY(task) )";
con.query(sql, function(err,result){
	if(err) throw err;
	console.log("Tasks Table created/success");
});

con.query("SELECT 1 FROM FinalAllocation", function(err,result){
	if(!err && result.length != 0){
		isAlgoRun = true;
		console.log("Algo run already");
	}
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('./loginPortal'));
app.use(express.static('./studentPortal'));
app.use(express.static('./teacherPortal'));

app.get('/',function(req,res){
	fs.readFile('loginPortal/login.html', function(err,data){
		if(err){
			console.log(err);
			res.writeHead(404,{'Content-Type':'text/html'});
		}
		else{
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(data.toString());
		}
		res.end();
	});
});

app.post('/portal', urlencodedParser, function(req,res){
	con.query("SELECT * FROM " + UserDetails + " WHERE uname = '" + req.body.uname + "'",function(err,result,fields){
		if(err)
			console.log(err);
		if(result.length == 0)
		{
			console.log("invalid user");
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(template("Invalid User"));
			res.end();
		}
		else if(result[0].pwd == req.body.pwd)
		{
			if(result[0].type == 'student')
			{
				if(!result[0].submitted)
				{
					fs.readFile('studentPortal/student_portal.html', function(err,data){
						if(err){
							console.log(err);
							res.writeHead(404,{'Content-Type':'text/html'});
						}
						else{
							res.writeHead(200,{'Content-Type':'text/html'});
							res.write(data.toString());
						}
						res.end();
					});
				}
				else
				{
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(template("Form Already Submitted"));
					res.end();
				}
			}
			else if(result[0].type == 'teacher')
			{
				if(!isAlgoRun)
				{
					fs.readFile('teacherPortal/teacher_portal.html', function(err,data){
						if(err){
							console.log(err);
							res.writeHead(404,{'Content-Type':'text/html'});
						}
						else{
							res.writeHead(200,{'Content-Type':'text/html'});
							res.write(data.toString());
						}
						res.end();
					});
				}
				else
				{
					fs.readFile('teacherPortal/assign_task.html', function(err,data){
						if(err){
							console.log(err);
							res.writeHead(404,{'Content-Type':'text/html'});
							res.end();
						}
						else{
							let tas = "";
							let sql = "SELECT talist FROM " + FinalAllocation + " WHERE instname = '" + req.body.uname + "'";
							con.query(sql, function(err,result,fields){
						    	if (!err){
						    		for(row of result){
						    			let tas1 = row['talist'].trim().split(" ");
						    			for(ta of tas1)
						    				tas+='<option value=\"' + ta + '\">' + ta + '</option>';
						    		}
						    	}
						    	else
						    		throw err;
						    	res.writeHead(200,{'Content-Type':'text/html'});
								res.write(data.toString().replace("###",tas));
								res.end();
						    });
						}
					});
				}
			}
			else if(result[0].type == 'admin')
			{
				fs.readFile('adminPortal/admin_portal.html', function(err,data){
					if(err){
						console.log(err);
						res.writeHead(404,{'Content-Type':'text/html'});
					}
					else{
						res.writeHead(200,{'Content-Type':'text/html'});
						res.write(data.toString());
					}
					res.end();
				});
			}
		}
		else
		{
			console.log("incorrect pwd");
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(template('Incorrect Password'))
			res.end();
		}
	});

});

app.post('/studentSubmit', urlencodedParser, function(req,res){
	con.query("SELECT * FROM " + UserDetails + " WHERE uname = '" + req.body.uname + "'",function(err,result,fields){
		if(err)
			console.log(err);
		else if(result.length == 0){
			console.log("Roll number not registered");
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(template("Roll number not registered"));
			res.end();
		}
		else if(result[0].submitted == 1){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(template("Preferences already Submitted"));
			res.end();
		}
		else{
			con.query("UPDATE " + UserDetails + " SET submitted = 1 WHERE uname ='" + req.body.uname + "'",function(err,result2){
				if(err) throw err;
				console.log(result2.affectedRows + " record(s) updated");
			});
			let sql = "INSERT INTO " + StudentPreferences + " (uname, cgpa, pref) VALUES ('" + req.body.uname + "', " + req.body.cgpa + ", '" + req.body.pref +"')";
			con.query(sql, function (err, result3) {
		    	if (err) throw err;
		  		console.log("Record inserted");
			});
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(template('Submitted Successfully'));
			res.end();
		}
	});
});

app.post('/teacherSubmit', urlencodedParser, function(req,res){
	con.query("SELECT * FROM " + TeacherPreferences + " WHERE cid = '" + req.body.cid + "'",function(err,result,fields){
		if(err)
			console.log(err);
		else if(result.length > 0){
			console.log("Course registered already");
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(template('Entered course has been registered already'));
			res.end();
		}
		else{
			let sql = "INSERT INTO " + TeacherPreferences + " (cid, instname, nta, pref) VALUES ('" + req.body.cid + "', '" + req.body.instname + "', " + req.body.nta + ", '" + req.body.pref +"')";
			con.query(sql, function (err, result) {
		    	if (err) throw err;
		  		console.log("Record inserted");
			});
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(template('Submitted Successfully'));
			res.end();
		}
	});
});

app.post('/adminSubmit', urlencodedParser, function(req,res){
	let details = req.body.details.split(",");
	if(req.body.action == "add"){
		if(req.body.table == "teacher"){
			con.query("SELECT * FROM " + TeacherPreferences + " WHERE cid = '" + details[0] + "'",function(err,result,fields){
				if(err)
					console.log(err);
				else if(result.length > 0){
					console.log("Course registered already");
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(template('Entered course has been registered already'));
					res.end();
				}
				else{
					let sql = "INSERT INTO " + TeacherPreferences + " (cid, instname, nta, pref) VALUES ('" + details[0] + "', '" + details[1] + "', " + details[2] + ", '" + details[3] +"')";
					con.query(sql, function (err, result) {
				    	if (err) throw err;
				  		console.log("Record inserted");
					});
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(template('Submitted Successfully'));
					res.end();
				}
			});
		}
		else{
			con.query("SELECT * FROM " + UserDetails + " WHERE uname = '" + details[0] + "'",function(err,result,fields){
				if(err)
					console.log(err);
				else if(result.length == 0){
					console.log("Roll number not registered");
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(template("Roll number not registered"));
					res.end();
				}
				else if(result[0].submitted == 1){
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(template("Preferences already Submitted"));
					res.end();
				}
				else{
					con.query("UPDATE " + UserDetails + " SET submitted = 1 WHERE uname ='" + details[0] + "'",function(err,result2){
						if(err) throw err;
						console.log(result2.affectedRows + " record(s) updated");
					});
					let sql = "INSERT INTO " + StudentPreferences + " (uname, cgpa, pref) VALUES ('" + details[0] + "', " + details[1] + ", '" + details[2] +"')";
					con.query(sql, function (err, result3) {
				    	if (err) throw err;
				  		console.log("Record inserted");
					});
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(template('Submitted Successfully'));
					res.end();
				}
			});
		}
	}
	else{
		if(req.body.table == "teacher"){
			con.query("SELECT * FROM " + TeacherPreferences + " WHERE cid = '" + details[0] + "'",function(err,result,fields){
				if(err) console.log(err);
				else if(result.length == 0){
					console.log("Course Preferences not Found");
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(template('Course Preferences not Found'));
					res.end();
				}
				else{
					let sql = "DELETE FROM " + TeacherPreferences + " WHERE cid = '" + details[0] + "'";
					con.query(sql, function (err, result){
				    	if (err) throw err;
				  		console.log("Course Preferences Deleted");
					});
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(template('Course Preferences Deleted'));
					res.end();
				}
			});
		}
		else{
			con.query("SELECT * FROM " + StudentPreferences + " WHERE uname = '" + details[0] + "'",function(err,result,fields){
				if(err) console.log(err);
				else if(result.length == 0){
					console.log("Student Preferences not Found");
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(template('Student Preferences not Found'));
					res.end();
				}
				else{
					let sql = "DELETE FROM " + StudentPreferences + " WHERE uname = '" + details[0] + "'";
					con.query(sql, function (err, result){
				    	if (err) throw err;
				  		console.log("Student Preferences Deleted");
					});
					sql = "UPDATE " + UserDetails + " SET submitted = 0 WHERE uname ='" + details[0] + "'";
		  			con.query(sql, function(err,result){
						if(err) throw err;
						console.log("Student access reset");
					});
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(template('Student Preferences Deleted'));
					res.end();
				}
			});
		}
	}
});

app.get('/runAlgo', urlencodedParser, function(req,res){
	let execFile = require('child_process').execFile;
	execFile('node', ['allocationAlgorithm/allocation_algorithm.js'], (err, stdout, stderr) => {
	    if(err){
	        console.error('stderr', stderr);
	        throw err;
	    }
	});
	isAlgoRun = true;
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write(template('Allocation Algorithm has been scheduled to run'));
	res.end();
});

app.post('/displayTable', urlencodedParser, function(req,res){
	var sql,transform,header;
	if(req.body.dtable == "student"){
		transform = {'<>':'tr','html':[
			{'<>':'td','html':'${uname}'},
			{'<>':'td','html':'${cgpa}'},
			{'<>':'td','html':'${pref}'}
		]};
		header = "<tr><th>Roll No</th><th>CGPA</th><th>Preferences</th></tr>";
		sql = "SELECT * FROM " + StudentPreferences;
	}
	else if(req.body.dtable == "teacher"){
		transform = {'<>':'tr','html':[
			{'<>':'td','html':'${cid}'},
			{'<>':'td','html':'${instname}'},
			{'<>':'td','html':'${nta}'},
			{'<>':'td','html':'${pref}'}
		]};
		header = "<tr><th>Course Id</th><th>Instructor</th><th>No of TAs</th><th>Preferences</th></tr>";
		sql = "SELECT * FROM " + TeacherPreferences;
	}
	else{
		transform = {'<>':'tr','html':[
			{'<>':'td','html':'${cid}'},
			{'<>':'td','html':'${instname}'},
			{'<>':'td','html':'${talist}'}
		]};
		header = "<tr><th>Course Id</th><th>Instructor</th><th>Allocated TA List</th></tr>";
		sql = "SELECT * FROM " + FinalAllocation;
	}
	con.query(sql, function(err,result,fields){
    	if (err) throw err;
  		console.log("Table Data fetched");
  		res.writeHead(200,{'Content-Type':'text/html'});
  		res.write("<style>tr:nth-child(even){background-color: #f2f2f2;}</style><table width=\"100%\">" + header + json2html.transform(result,transform) + "</table>");
  		res.end();
	});
});

app.get('/getTask', function(req, res){
    let sql = "SELECT * FROM Tasks";
    con.query(sql, function(err, result, fields){
        if(err) throw err;
        else{
            console.log("Tasks data fetched");
            res.writeHead(404,{'Content-Type':'text/html'});
            res.end();
        }
    });
});

app.post('/taskSubmit', urlencodedParser, function(req,res){
	let sql = "INSERT INTO " + Tasks + " (tna, task) VALUES ('" + req.body.tna+ "', '" + req.body.task +"')";
	con.query(sql, function (err, result) {
    	if (err) throw err;
  		console.log("Record inserted");
	});
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write(template('Submitted Successfully'));
	res.end();
});

var server = app.listen(8080);
