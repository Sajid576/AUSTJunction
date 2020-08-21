
var selectedDepartment = localStorage.getItem("selected_dept");
var selectedSemester = localStorage.getItem("selected_semester");

console.log("department:  "+selectedDepartment)
console.log("semester:  "+selectedSemester)
//nav bar elements id
var dept_header=document.getElementById("dept_header");
var semester_header=document.getElementById("semester_header");

dept_header.innerHTML=selectedDepartment;
semester_header.innerHTML=selectedSemester;

//box elements id
var boxCollection=document.getElementById("boxCollection");


function fetchLectures()
{

    const usersCollection = firebase.firestore().collection('lecture_link');

    const query = usersCollection.doc(String(selectedDepartment).trim())

    query.get()
    .then(lecture => {
      if(lecture.exists)
        {
              

               var lectureRef=lecture.data();

               var semesterRef=lectureRef[String(selectedSemester).trim()];
              
               if(semesterRef!=null)
               {
                    var output='';
                    for (var i=0;i<semesterRef.length;i++)
                    {
                        var detailMap=semesterRef[i];
                        var contributor=detailMap['contributor'];
                        var driveLink=detailMap['drive_link'];
                        var session=detailMap['session'];

                        output+='<div  class="col-lg-4 col-md-4 col-sm-4 ">';
                        output+= '  <div class="inner_box">';
                        output+= '     <i class="fa fa-laptop" aria-hidden="true"></i>';
                        output+='           <h3>Click the following button for download</h3><hr> ';
                      
                        output+='           <label style="color:#000000;"><u>Contributor:</u> </label><br>';       
                        output+='           <label id="contributor-name" for="Name"style="color:#000000;font-weight:bold;">'+contributor+'</label><br>';
                              
                          
                        output+='           <label style="color:#000000;"><u>Session:</u> </label> <br>';
                         
                        output+='           <label id="session" for="Session"style="color:#000000;font-weight:bold;">'+session+'</label><br><br>';
                         
                         
                        output+='           <a href="'+driveLink+'" class="readmore">Download</a>';
                        output+='    </div>';
                        output+='</div>';
                        
                        console.log("contributor:  "+contributor+",driveLink: "+driveLink+",Session: "+session);
                        boxCollection.innerHTML=output;

                    }

               }
               

              
        }

      else
        alert('No lecture available right now.Try again later');
      })
    .catch(error => {
        alert(error.message);
    });

}
fetchLectures();