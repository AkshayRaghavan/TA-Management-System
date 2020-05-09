var express = require('express')
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express()

const UserDetails = 'UserDetails';
const StudentPreferences = 'StudentPreferences';
const TeacherPreferences = 'TeacherPreferences';

var template = function(msg){
	var retval = fs.readFileSync('loginPortal/template.html');
	return retval.toString().replace('####',msg);
}

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

var sql = "create table IF NOT EXISTS UserDetails(uname varchar(100), pwd varchar(100), type varchar(100), submitted boolean, PRIMARY KEY(uname))";
con.query(sql, function(err,result){
	if(err) throw err;
	console.log("Table created/success");
});

sql = "create table IF NOT EXISTS StudentPreferences(uname varchar(100), cgpa DECIMAL(4,2), pref varchar(1000), PRIMARY KEY(uname))";
con.query(sql, function(err,result){
	if(err) throw err;
	console.log("Table created/success");
});

sql = "create table IF NOT EXISTS TeacherPreferences(cid char(6), instname varchar(30), nta INTEGER, pref varchar(100), PRIMARY KEY(cid))";
con.query(sql, function(err,result){
	if(err) throw err;
	console.log("Table created/success");
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
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(template("Invalid User"));
			res.end();
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
				res.writeHead(200,{'Content-Type':'text/html'});
				res.write(template("Already Submitted"));
				res.end();
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
		console.log(req.body.uname);

		if(result.length == 0)
		{
			console.log("Roll number not registered");
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(template("Roll number not registered"));
			res.end();
		}
		else if(result[0].submitted == 1)
		{
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(template("Already Submitted"));
			res.end();
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
		console.log(req.body.instname);
		if(result.length > 0){
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
	var sql;
	let details = req.body.details.split(",");
	if(req.body.action=="add"){
		if(req.body.table=="teacher")
			sql = "INSERT INTO " + TeacherPreferences + " (cid, instname, nta, pref) VALUES ('" + details[0] + "', '" + details[1] + "', " + details[2] + ", '" + details[3] +"')";
		else
			sql = "INSERT INTO " + StudentPreferences + " (uname, cgpa, pref) VALUES ('" + details[0] + "', " + details[1] + ", '" + details[2] +"')";
	}
	else{
		if(req.body.table=="teacher")
			sql = "DELETE FROM " + TeacherPreferences + " WHERE cid = '" + details[0] + "'";
		else
			sql = "DELETE FROM " + StudentPreferences + " WHERE uname = '" + details[0] + "'";
	}

	con.query(sql, function (err, result){
    	if (err) throw err;
  		console.log("Action '" + req.body.action + "' completed");

  		if(req.body.action == "del" && req.body.table == "student"){
  			let con1 = Object.assign({},con);
  			let sql1 = "UPDATE " + UserDetails + "SET submitted = 0 WHERE uname ='" + details[0] + "'";
  			con1.query(sql1, function(err,result){
				  if(err) throw err;
				  console.log("Student record reset");
			  });
  		}
      res.writeHead(200,{'Content-Type':'text/html'});
	    res.write(template('Action Completed Successfully'));
	    res.end();
	});
});

app.post('/runAlgo', urlencodedParser, function(req,res){
	let execFile = require('child_process').execFile;
	execFile('node', ['TA_allocation_algorithm/Multi_round_stable_matching.js'], (err, stdout, stderr) => {
	    if(err){
	        console.error('stderr', stderr);
	        throw err;
	    }
	});
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write(template('Algo scheduled to run'));
	res.end();
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
