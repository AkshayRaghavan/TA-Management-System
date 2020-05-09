/*
DON'T FORGET TO CHANGE THE USERNAME, PASSWORD. 

Execute the following in MySQL workbench if some connection error shows up:-
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'anand1998';

*/

var mysql=require('mysql');

var con=mysql.createConnection(
    {
        host:"localhost",
        user:"test",
        password:"123",
        database:"se"
    }
);

con.query("SELECT * FROM studentdata,studentpreferences where studentdata.roll=studentpreferences.uname;", function (err1, result1, fields1) {
  if (err1) throw err1;
  con.query("SELECT * FROM teacherpreferences;",function(err2,result2,fields2){
    if(err2) throw err2;
    // finding student preference order
    var student_pref={};
    for(row of result1)
    {
        var pref_string=row["pref"]
        pref_string=pref_string.replace( /[\r\n]+/gm, "" ); // removing carriage return
        student_pref[row["roll"]]=pref_string.trim().split(' '); // starts with the order he gives
        his_course_grades=JSON.parse(row["grades"]);
        for(course in his_course_grades)  // append the remainining courses he has done before after his inital preference list
        {
          if(student_pref[row["roll"]].indexOf(course)===-1) // note that we should not include again the courses that were added by the preference list he gave
          {
            student_pref[row["roll"]].push(course);
          }
        }
    }

    // getting preferences of each course(or instructor)
    var course_pref={};
    for(row of result2)
    {
      var pref_string=row["pref"]
      pref_string=pref_string.replace( /[\r\n]+/gm, "" ); // removing carriage returns that may be present
      course_pref[row["cid"]]=pref_string.trim().split(' '); // starts with the order he gives
    }

    //finding the list of students by course
    var applications={};
    for(roll in student_pref)
    {
      for(course of student_pref[roll])
      {
        if(course in applications)
          ;
        else
          applications[course]=[];
        applications[course].push(roll);
      }
    }

    // finding the grades each student got
    var grades_by_student={};
    for(row of result1)
    {
      grades_by_student[row["roll"]]=JSON.parse(row["grades"]);
    }

    // sorting the list of students by course based on the grade the he got in that course
    for(course in applications)
    {
        applications[course].sort(function(a, b){return -(grades_by_student[a][course] - grades_by_student[b][course])}); // descending order
    }// preference order for each course is created

    for(course in applications){
      const sorted_pref_order=applications[course];
      const actual_pref_order=[];
      for(student of course_pref[course]){
        actual_pref_order.push(student); // first, we push the order given by instructor
        sorted_pref_order.splice(sorted_pref_order.indexOf(student),1); // removing the student from the sorted order, so that we don't insert him again
      }
      // then, we append the remaining students in the order of decreasing grade in that course (we already sorted)
      applications[course]=actual_pref_order.concat(sorted_pref_order);
    }

    // map for no of TAs by course
    var no_of_TAs_by_course={};
    for(row of result2)
    {
      no_of_TAs_by_course[row["cid"]]=row["nta"];
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var state_of_course={}; // 0 means unallocated, 1 means currently allocated, 2 means already taken and out of selection process
    var allocated_student_for_course={};
    var round_of_course={}; // FOR STORING ROUNDS OF EACH COURSE
    var no_of_TAs_alloted={}
    for(course in applications)
    {
      state_of_course[course]=0;
      allocated_student_for_course[course]=null;
      round_of_course[course]=0;
      no_of_TAs_alloted[course]=0;
    }

    var state_of_student={};
    var allocated_course_for_student={}
    for(student in student_pref)
    {
      state_of_student[student]=0;
      allocated_course_for_student[student]=null;
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
        for(course in state_of_course)
        {
          if(state_of_course[course]===0)
          {
              all_allocated=false;
              break;
          }
        }
        if(all_allocated)
          break;
      }

      for(student in state_of_student)
      {
        if(state_of_student[student]===1)
        {
            state_of_student[student]=2; // permanenly taken, taking the student away from selection process
            allocated_course=allocated_course_for_student[student]
            if(!(allocated_course in final_allocation_of_course))
              final_allocation_of_course[allocated_course]=[];
            final_allocation_of_course[allocated_course].push(student);
        }
      }
      for(course in state_of_course)
      {
        if(state_of_course[course]===1)
          no_of_TAs_alloted[course]++;
        if(no_of_TAs_alloted[course]===no_of_TAs_by_course[course])
          state_of_course[course]=2; // course allocation complete, course would be remove from selection process
        else
          state_of_course[course]=0;
      }
      all_courses_alloted=true;
      for(course in state_of_course)
      {
        if(state_of_course[course]!=2)
        {
            all_courses_alloted=false;
            break;
        }
      }
      if(all_courses_alloted)
        break;
    }


    console.log("FINAL ALLOCATION:\n",final_allocation_of_course);

    // creating the table (if not already there) for storing the allocation
    con.query("CREATE TABLE IF NOT EXISTS final_allocation(course text,list_of_TAs text);", function (err3, result3) {
    if (err3) throw err3;
    con.query("DELETE FROM final_allocation;",function(err4,result4){ // deleting the table
      if(err4) throw err4;
      for(course in final_allocation_of_course)
      {
          var s=""; // string for storing alloted TAs, separated by spaces
          for(student of final_allocation_of_course[course])
          {
              s+=student+" ";
          }
          a=s.slice(0,-1);
          sql='INSERT INTO final_allocation values("'+course+'","'+s+'");';
          con.query(sql,function(err5,result5){
            if(err4) throw err4;
          });
        }
        console.log("Table final_allocation created and the allocations were succesfully inserted!");
      });
    });
  });
});
