const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
    name:String,
    department:String,
    rollno:String,
    cgpa:Number
});


module.exports=mongoose.model('tblstudent',studentSchema);