const mongoose=require('mongoose');

const compstudentSchema=new mongoose.Schema({
    company:String,
    rollno:String
});


module.exports=mongoose.model('tblcompstudent',compstudentSchema);