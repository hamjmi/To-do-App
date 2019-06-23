const mongoose=require('mongoose');

const companySchema=new mongoose.Schema({
    name:String,
    profile:String,
    location:String,
    package:Number
});


module.exports=mongoose.model('tblcompany',companySchema);