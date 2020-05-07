var express = require('express')
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express()

const UserDetails = 'UserDetails';
const StudentPreferences = 'StudentPreferences';
const TeacherPreferences = 'TeacherPreferences';

var con = mysql.createConnection({
	host:"localhost",
	user : "root",
	password: "akshMysql12",
	database: 'se'
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
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
			//console.log(data.toString());
			}
		res.end();
	});
});

app.post('/portal', urlencodedParser, function(req,res){
	//console.log(req.data);
	con.query("SELECT * FROM "+ UserDetails + " WHERE uname = '" + req.body.uname + "'",function(err,result,fields){
		if(err)
			console.log(err);
		//console.log(result);
		if(result.length == 0)
		{
			console.log("invalid user");
			res.writeHead(403,{'Content-Type':'text/html'});
			res.end('<h1>INVALID USER</h1>');
		}
		else if(result[0].pwd == req.body.pwd)
		{
			if(!result[0].submitted)
			{
				if(result[0].type == 'student')
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
				else if(result[0].type == 'teacher')
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
				res.writeHead(403,{'Content-Type':'text/html'});
				res.end('<h1>ALREADY SUBMITTED</h1>');
			}
			
		}
		else
		{
			console.log("incorrect pwd");
			res.writeHead(403,{'Content-Type':'text/html'});
			res.end('<h1>INCORRECT PASSWORD</h1>');
		}
	});

});

app.post('/studentSubmit', urlencodedParser, function(req,res){
	con.query("SELECT * FROM " + UserDetails + " WHERE uname = '" + req.body.uname + "'",function(err,result,fields){
		if(err)
			console.log(err);
		console.log(req.body.uname);
		if(result.length == 0)
		{
			console.log("Roll number not registered");
			res.writeHead(403,{'Content-Type':'text/html'});
			res.end('<h1>Roll number not registered</h1>');
		}
		else
		{
			con.query("UPDATE " + UserDetails +" SET submitted = 1 WHERE uname ='" + req.body.uname + "'",function(err,result2){
				if(err) throw err;
				console.log(result2.affectedRows + " record(s) updated");
			});
			var sql = "INSERT INTO " + StudentPreferences +" (uname, cgpa, pref) VALUES ('" + req.body.uname + "', " + req.body.cgpa + ", '" + req.body.pref +"')";
			con.query(sql, function (err, result3) {
		    	if (err) throw err;
		  		console.log("1 record inserted");
			});
			fs.readFile('studentPortal/submitSuccess.html', function(err,data){
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
			//res.writeHead(403,{'Content-Type':'text/html'});
			//res.end('<h1>Submitted Successfully</h1>');
		}
	});
});

app.post('/teacherSubmit', urlencodedParser, function(req,res){
	con.query("SELECT * FROM " + UserDetails + " WHERE instname = '" + req.body.instname + "'",function(err,result,fields){
		if(err)
			console.log(err);
		console.log(req.body.instname);
		if(result.length == 0)
		{
			console.log("Instructor not registered");
			res.writeHead(403,{'Content-Type':'text/html'});
			res.end('<h1>Instructor not registered</h1>');
		}
		else
		{
			var sql = "INSERT INTO " + TeacherPreferences + " (cid, instname, nta, pref) VALUES ('" + req.body.cid + "', '" + req.body.instname + "', " + req.body.nta + ", '" + req.body.pref +"')";
			con.query(sql, function (err, result) {
		    	if (err) throw err;
		  		console.log("Record inserted");
			});
			fs.readFile('teacherPortal/submitSuccess.html', function(err,data){
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
	});
});

app.post('/adminSubmit', urlencodedParser, function(req,res){
	con.query("SELECT * FROM " + UserDetails + " WHERE instname = '" + req.body.instname + "'",function(err,result,fields){
		if(err)
			console.log(err);
		console.log(req.body.instname);
		if(result.length == 0)
		{
			console.log("Invalid Admin");
			res.writeHead(403,{'Content-Type':'text/html'});
			res.end('<h1>Invalid Admin</h1>');
		}
		else
		{
			var sql = "";
			var details = req.body.details.split(",");
			if(req.body.action=="add")
				sql = "INSERT INTO ";
			else if(req.body.action==",modify")
				sql = "ALTER TABLE ";
			else
				sql = "DELETE FROM ";

			if(req.body.table=="teacher")
				sql += TeacherPreferences + " (cid, instname, nta, pref) VALUES ('" + details[0] + "', '" + details[1] + "', " + details[2] + ", '" + details[3] +"')";
			else
				sql += StudentPreferences + " (uname, cgpa, pref) VALUES ('" + details[0] + "', " + details[1] + ", '" + details[2] +"')";

			con.query(sql, function (err, result) {
		    	if (err) throw err;
		  		console.log("Action '" + req.body.action + "' completed");
			});
			fs.readFile('adminPortal/submitSuccess.html', function(err,data){
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
	});
});

var server = app.listen(8080);


// var http = require('http');
// var fs = require('fs');
// var url = require('url');

// http.createServer(function(req, res){
// 	var path = url.parse(req.url).pathname;
// 	console.log(path);
// 	fs.readFile(path.substr(1), function(err,data){
// 		if(err){
// 			console.log(err);
// 			res.writeHead(404,{'Content-Type':'text/html'});
// 			res.end();
// 		}
// 		else{
// 			res.writeHead(200,{'Content-Type':'text/html'});
// 			res.write(data.toString());
// 			console.log(data.toString());
// 			fs.readFile('center.png', function(err,data){
// 				if(err){
// 					console.log(err);
// 					res.writeHead(404,{'Content-Type':'text/html'});
// 				}
// 				else{
// 					res.writeHead(200,{'Content-Type':'image/png'});
// 					res.write(data.toString());
// 					//console.log(data.toString());
// 				}
// 			});
// 			res.end();
// 		}
// 	});
// }).listen(8080);
