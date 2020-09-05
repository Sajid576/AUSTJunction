



function fetchLectures()
{

    const usersCollection = firebase.firestore().collection('lecture_link');

    const query = usersCollection.doc(String(selectedDepartment).trim())

    query.get()
    .then(lecture => {
      if(lecture.exists)
        {
              

               
               








              
        }

      else
        alert('No lecture available right now.Try again later');
      })
    .catch(error => {
        alert(error.message);
    });

}
fetchLectures();