const firebase=require('./FirebaseConnection');


class LectureModel{
    static allLecturesData=new Map();
    
    constructor()
    {

    }
    logger()
    {
        console.log("State of all lecture data: ");
        for (let [key, value] of LectureModel.allLecturesData) 
        {
            console.log(key + ' = ' + JSON.stringify(value,null,4));
            console.log('\n');
        }
    }
    //this method will be called on server startup to fetch all the data of all lectures of the varsity
    fetchAllLecturesFromDb()
    {
        const query = firebase.firestore().collection('lecture_link').get();

        query.then(snapshot => {
            snapshot.forEach(departments => 
            {
                
                var deptName=departments.id;
                var deptMaterials=departments.data();

                LectureModel.allLecturesData.set(deptName,deptMaterials);
                

            });
            this.logger();
                
               
        })
        .catch(error => {
            console.error(error);
        });
    }
    fetchAllLectures(dept,semester)
    {
        dept=String(dept).trim();
        semester=String(semester).trim();
        LectureModel.allLecturesData.get(dept)[semester];

    }

}

module.exports={
    LectureModel
}