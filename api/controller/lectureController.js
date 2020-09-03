lectureData=require('../model/LectureModel');

fetchLectureData=(req,res,next)=>{
    const dept=req.params.department;
    const semester=req.params.semester;
    
    console.log(dept+"--"+semester);
    lecObj=new lectureData.LectureModel();
    var lecturesInfo= lecObj.fetchAllLectures(dept,semester);

    res.status(200).json({
        message:"All the lectures are fetched successfully",
        lecturesData: lecturesInfo,
    })

}
module.exports.fetchLectureData=fetchLectureData