lectureData=require('../model/LectureModel');

fetchLectureData=(req,res,next)=>{
    const dept=req.body.department;
    const semester=req.body.semester;
    
    lecObj=new lectureData.LectureModel();
    var lecturesInfo= lecObj.fetchAllLectures(dept,semester);

    res.status(200).json({
        message:"All the lectures are fetched successfully",
        lecturesData: lecturesInfo,
    })

}
module.exports.fetchLectureData=fetchLectureData