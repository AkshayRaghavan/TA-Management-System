/*

Execute the following in MySQL workbench if some error shows up:-

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'anand1998'

*/

var mysql=require('mysql');

var con=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"anand1998",
        database:"dbs"
    }
);

con.query("SELECT * FROM student_details,students_pref where student_details.roll=students_pref.roll;", function (err1, result1, fields1) {
  if (err1) throw err1;
  con.query("SELECT * FROM courses;",function(err2,result2,fields2){
    if(err2) throw err2;
    // finding student preference order
    var student_pref={};
    for(row of result1)
    {
        var pref_string=row["pref"]
        pref_string=pref_string.replace( /[\r\n]+/gm, "" ); // removing carriage return
        student_pref[row["roll"]]=pref_string.split(' '); // starts with the order he gives
        his_course_grades=JSON.parse(row["grades"]);
        for(j in his_course_grades)  // append the remainining courses he has done before after his inital preference list
        {
          if(student_pref[row["roll"]].indexOf(j)===-1) // note that we should not include again the courses that were added by the preference list he gave
          {
            student_pref[row["roll"]].push(j);
          }
        }
    }

    //finding the list of students by course
    var applications={};
    for(roll in student_pref)
    {
      for(i of student_pref[roll])
      {
        if(i in applications)
          ;
        else
          applications[i]=[];
        applications[i].push(roll);
      }
    }

    // finding the grades each student got
    var grades_by_student={};
    for(row of result1)
    {
      //grades_by_student[row["roll"]]=JSON.parse('{"name":12,"age":24}');
      grades_by_student[row["roll"]]=JSON.parse(row["grades"]);
    }

    // sorting the list of students by course based on the grade the he got in that course
    for(i in applications)
    {
        applications[i].sort(function(a, b){return -(grades_by_student[a][i] - grades_by_student[b][i])}); // descending order
    }// preference order for each course is created

    // map for no of TAs by course
    var no_of_TAs_by_course={};
    for(row of result2)
    {
      no_of_TAs_by_course[row["course"]]=row["number_of_TAs_required"];
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var state_of_course={}; // 0 means unallocated, 1 means currently allocated, 2 means already taken and out of selection process
    var allocated_student_for_course={};
    var round_of_course={}; // FOR STORING ROUNDS OF EACH COURSE
    var no_of_TAs_alloted={}
    for(i in applications)
    {
      state_of_course[i]=0;
      allocated_student_for_course[i]=null;
      round_of_course[i]=0;
      no_of_TAs_alloted[i]=0;
    }

    var state_of_student={};
    var allocated_course_for_student={}
    for(i in student_pref)
    {
      state_of_student[i]=0;
      allocated_course_for_student[i]=null;
    }

    // start of algorithm
    var final_allocation_of_course={};
    while(true)
    {
      while(true)
      {
        for(course in applications)
        {
          if(state_of_course[course]===0)
          {
            if(round_of_course[course]===applications[course].length)
            {
              console.log("No more students to offer for "+course);
              break;
              return;
            }
            var student_offered=applications[course][round_of_course[course]];
            if(state_of_student[student_offered]===0)
            {
              state_of_student[student_offered]=1;
              state_of_course[course]=1;
              allocated_course_for_student[student_offered]=course;
              allocated_student_for_course[course]=student_offered;
            }
            else if(state_of_student[student_offered]===1)
            {
              index_of_course_offered=student_pref[student_offered].indexOf(course);
              currently_taken_course=allocated_course_for_student[student_offered];
              index_of_currently_taken_course=student_pref[student_offered].indexOf(currently_taken_course);
              if(index_of_course_offered<index_of_currently_taken_course) // then currently offered course would be prefered
              {
                // deallocating the previous offerer
                state_of_course[currently_taken_course]=0;
                allocated_student_for_course[currently_taken_course]=null;
                // new allocation
                state_of_course[course]=1;
                allocated_student_for_course[course]=student_offered;
                // state_of_student[student_offered]=1; // this is one anyway, but, we write to understand
                allocated_course_for_student[student_offered]=course;
              }
            }
            // Else (when state=2), do nothing as the student has already been taken, go to next round
            round_of_course[course]++;
          }
        }
        all_allocated=true;
        for(key in state_of_course)
        {
          if(state_of_course[key]===0)
          {
              all_allocated=false;
              break;
          }
        }
        if(all_allocated)
          break;
      }

      for(key in state_of_student)
      {
        if(state_of_student[key]===1)
        {
            state_of_student[key]=2; // permanenly taken, taking the student away from selection process
            allocated_course=allocated_course_for_student[key]
            if(!(allocated_course in final_allocation_of_course))
              final_allocation_of_course[allocated_course]=[];
            final_allocation_of_course[allocated_course].push(key);
        }
      }
      for(key in state_of_course)
      {
        if(state_of_course[key]===1)
          no_of_TAs_alloted[key]++;
        if(no_of_TAs_alloted[key]===no_of_TAs_by_course[key])
          state_of_course[key]=2; // course allocation complete, course would be remove from selection process
        else
          state_of_course[key]=0;
      }
      all_courses_alloted=true;
      for(key in state_of_course)
      {
        if(state_of_course[key]!=2)
        {
            all_courses_alloted=false;
            break;
        }
      }
      if(all_courses_alloted)
        break;
    }


    console.log("FINAL ALLOCATION:\n");
    console.log(final_allocation_of_course);

    // creating the table (if not already there) for storing the allocation
    con.query("CREATE TABLE IF NOT EXISTS final_allocation(course text,list_of_TAs text);", function (err3, result3) {
    if (err3) throw err3;
    con.query("DELETE FROM final_allocation;",function(err4,result4){ // deleting the table
      if(err4) throw err4;
      for(key in final_allocation_of_course)
      {
          var s="";
          for(i of final_allocation_of_course[key])
          {
              s+=i+" ";
          }
          a=s.slice(0,-1);
          sql='INSERT INTO final_allocation values("'+key+'","'+s+'");';
          con.query(sql,function(err5,result5){
            if(err4) throw err4;
          });
        }
        console.log("Table final_allocation created and the allocations were succesfully inserted!");
      });
    });
  });
});
