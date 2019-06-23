
//Author: Mohd Hamid
//EmailId: hamid7825@gmail.com
//College: Jamia Millia Islamia


//Importing the required modules
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Using EJS template engine
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Importing the table schema
const stu=require('./database/models/student')
const comp=require('./database/models/company')
const compstu=require('./database/models/compstu')

//Variables used
var post;
var postcomp;
var poststucomp;
var temp;
var str;
var mystr;

//Middeleware to validate AddStudent and Checking if it is already present
const validateAddStudent=async(req,res,next)=>{
    //checking no input is empty
    if(!(req.body.name)||!(req.body.department)||!(req.body.rollno)||!(req.body.cgpa))
    {
        return res.redirect('/addstudent.html')
    }
    var query;
	if(req.body.rollno){	
		query=req.body.rollno;
    }
    var myquery = { rollno: query };
    temp=myquery;
    
    //checking if it is already present
    post=await stu.find(myquery);
    //console.log(post);
    
    //generating the required message if it is already present
    str="Rollno "+query+" is already present in the database";
    mystr={name:str};
    //console.log(str);

    //if it is present then redirect where apropriate message will be displayed..
    if(post[0])
    {
        return res.redirect('/temp.html');
    }
    
    next()
}

//Middeleware to validate AddCompany and Checking if it is already present
const validateAddCompany=async(req,res,next)=>{
    if(!(req.body.name)||!(req.body.profile)||!(req.body.location)||!(req.body.package))
    {
        return res.redirect('/regcompany.html')
    }
    var query;
    //console.log(req.body.name)
	if(req.body.name){	
		query=req.body.name;
    }
    var myquery = { name: query };
    temp=myquery;

    //generating the required message if it is already present
    str="Company "+query+" is already present in the database";
    mystr={name:str};
    //console.log(temp);

    //checking if it is already present
    post=await comp.find(myquery);
   // console.log(post);
   //if it is present then redirect where apropriate message will be displayed..
    if(post[0])
    {
        return res.redirect('/temp.html');
    }
    next()
}

//Middeleware to validate Registering student to company and Checking if it is already present
const validateAddStudentCompany=async(req,res,next)=>{
     //checking no input is empty
    if(!(req.body.company)||!(req.body.rollno))
    {
        return res.redirect('/regstu.html')
    }
    var myquery;
    var m1,m2;
    if(req.body)
    {
        myquery=req.body;
        m1=req.body.company;
        m2=req.body.rollno;
    }
    var myquery1 = { name: m1 };
    var myquery2 = { rollno: m2 };
    temp=myquery;

    //checking if it is already present
    post=await compstu.find(myquery);
    postcomp=await comp.find(myquery1);
    poststucomp=await stu.find(myquery2);
    // console.log(post);

    //generating the required message if it is already present
    if(!poststucomp[0] && !postcomp[0])
    {
        str="Company "+m1+" as well as rollno "+m2+" are not present in the database";
    }
    else if(!poststucomp[0])
    {
        str="Rollno "+m2+" is not present in the database";
    }
    else if(!postcomp[0])
    {
        str="Company "+m1+" is not present in the database";
    }
    else
    {
        str="Rollno "+m2+" is already registered for company "+m1;
    }
    mystr={name:str};

    //if it is present then redirect where apropriate message will be displayed..
    if(!postcomp[0]||!poststucomp[0]||post[0])
    {
        return res.redirect('/temp.html');
    }
    next()
}

//Middeleware to validate Removing Registration of student to company and Checking if it is not present
const validateRemStudentCompany=async(req,res,next)=>{
    //console.log(req.body)
     //checking no input is empty
    if(!(req.body.company)||!(req.body.rollno))
    {
        return res.redirect('/unregstu.html')
    }
    var myquery;
    if(req.body)
    {
        myquery=req.body;
    }
    temp=myquery;

    //checking if it is already present
    post=await compstu.find(myquery);

    //generating the required message if its not present
    str="Rollno "+req.body.rollno+" is not registered for company "+req.body.company;
    mystr={name:str};
    //console.log(post);

    //if it is not present then redirect where apropriate message will be displayed..
    if(!post[0])
    {
        return res.redirect('/temp.html');
    }
    next()
}

//Middeleware to validate Delete student and Checking if it is not present
const validateRemove=async(req,res,next)=>{
     //checking no input is empty
    if(!req.body.rollno)
    {
        return res.redirect('/removestudent.html')
    }
    var query;
	if(req.body.rollno){	
		query=req.body.rollno;
    }
    var myquery = { rollno: query };
    temp=myquery;

    //checking if it is already present
    post=await stu.find(myquery);

    //generating the required message if its not present
    str="Rollno "+query+" is not present in the database";
    mystr={name:str};
    //console.log(post[0]);

    //if it is not present then redirect where apropriate message will be displayed..
    if(!post[0])
    {
        return res.redirect('/temp.html');
    }
    next()
}

//Middeleware to validate student search and Checking if it is not present
const validateSearch=async(req,res,next)=>{
     //checking no input is empty
    if(!req.body.rollno)
    {
        return res.redirect('/searchstudent.html')
    }
    var query;
	if(req.body.rollno){	
		query=req.body.rollno;
    }
    var myquery = { rollno: query };
    temp=myquery;
    //checking if it is already present
    post=await stu.find(myquery);

    //generating the required message if its not present
    str="Rollno "+query+" is not present in the database";
    mystr={name:str};
    //console.log(post);

    //if it is not present then redirect where apropriate message will be displayed..
    if(!post[0])
    {
        return res.redirect('/temp.html');
    }
    next()
}

//Middeleware to validate student record edit and Checking if it is not present
const validateEdit=async(req,res,next)=>{
     //checking no input is empty
    if(!req.body.rollno)
    {
        return res.redirect('/editstudent.html')
    }
    var query;
	if(req.body.rollno){	
		query=req.body.rollno;
    }
    var myquery = { rollno: query };
    temp=myquery;

    //checking if it is already present
    post=await stu.find(myquery);

    //generating the required message if its not present
    str="Rollno "+query+" is not present in the database";
    mystr={name:str};
    //console.log(post);

    //if it is not present then redirect where apropriate message will be displayed..
    if(!post[0])
    {
        return res.redirect('/temp.html');
    }
    next()
}

//Middeleware to validate remove company and Checking if it is not present
const validateRemCompany=async(req,res,next)=>{
     //checking no input is empty
    if(!req.body.name)
    {
        return res.redirect('/unregcompany.html')
    }
    var query;
	if(req.body.name){	
		query=req.body.name;
    }
    var myquery = { name: query };
    temp=myquery;

    //checking if it is already present
    post=await comp.find(myquery);

    //generating the required message if its not present
    str="Company "+query+" is not present in the database";
    mystr={name:str};
    ///console.log(post[0]);

    //if it is not present then redirect where apropriate message will be displayed..
    if(!post[0])
    {
        return res.redirect('/temp.html');
    }
    next()
}

//Middeleware to validate show all company for student and Checking if it is not present
const validateAllComp=async(req,res,next)=>{
     //checking no input is empty
     if(!req.body.rollno)
    {
        return res.redirect('/showcompforstudent.html')
    }
    var query;
	if(req.body.rollno){	
		query=req.body.rollno;
    }
    var myquery = { rollno: query };
    temp=myquery;

    //checking if it is already present
    post=await stu.find(myquery);
    postcomp=await compstu.find(myquery);

    //generating the required message if its not present
    if(!post[0])
    {
        str="Rollno "+query+" is not present in the database ";
    }
    else
    {
      
        str="Rollno "+query+" is not registered for any company in the database";
    }

    mystr={name:str};
    //console.log(post);

    //if it is not present then redirect where apropriate message will be displayed..
    if(!postcomp[0] )
    {
        return res.redirect('/temp.html');
    }
    next()
}

//Middeleware to validate show all student for companay and Checking if it is not present
const validateAllStu=async(req,res,next)=>{
     //checking no input is empty
    if(!req.body.name)
    {
        return res.redirect('/showstuforcompany.html')
    }
    var query;
	if(req.body.name){	
		query=req.body.name;
    }
    var myq={name:query}
    var myquery = { company: query };
    temp=myquery;

    //checking if it is already present
    post=await comp.find(myq);
    postcomp=await compstu.find(myquery);

    //generating the required message if its not present
    if(!post[0])
    {
        str="Company "+query+" is not present in the database ";
    }
    else
    {
      
        str="Company "+query+" is not registered by any student in the database";
    }
    //str="Company "+query+" is not present in the database";
    mystr={name:str};
    //console.log(post[0]);

    //if it is not present then redirect where apropriate message will be displayed..
    if(!postcomp[0])
    {
        return res.redirect('/temp.html');
    }
    next()
}

//Using all the Validation Middleware
app.use('/post/store',validateAddStudent);
app.use('/post/store1',validateAddCompany);
app.use('/post/remcomp',validateRemCompany);
app.use('/post/store2',validateAddStudentCompany);
app.use('/post/remstucomp',validateRemStudentCompany);
app.use('/post/rem',validateRemove);
app.use('/post/rem2',validateEdit);
app.use('/post/rem1',validateSearch);
app.use('/post/show1',validateAllComp);
app.use('/post/show2',validateAllStu);

//handling request for /
app.get('/',(req,res)=>{
    
    res.render('index')
});

//handling request for index.html to show home page
app.get('/index.html',(req,res)=>{
    res.render('index')
   
});

//handling request for index.html to show validation error page
app.get('/temp.html',(req,res)=>{
    res.render('temp',mystr)
   
});

//handling request for addstudent.html to show addstudent page
app.get('/addstudent.html',(req,res)=>{
    res.render('addstudent')
});

//handling request for removestudent.html to show removestudent page
app.get('/removestudent.html',(req,res)=>{
    res.render('removestudent')
});

//handling request for removestudent.html to show remoevstudent page
app.get('/editstudent.html',(req,res)=>{
    res.render('editstudent')
    
});

//handling request for searchstudent.html to show searchstudent page
app.get('/searchstudent.html',(req,res)=>{
    res.render('searchstudent')
});

//handling request for regcompany.html to show registering company page
app.get('/regcompany.html',(req,res)=>{
    res.render('regcompany')
});

//handling request for unregcompany.html to show unregistering company page
app.get('/unregcompany.html',(req,res)=>{
    res.render('unregcompany')
});

//handling request for regstu.html to show registering student to company page
app.get('/regstu.html',(req,res)=>{
    res.render('regstu')
});

//handling request for unregstu.html to show unregistering student to company page
app.get('/unregstu.html',(req,res)=>{
    res.render('unregstu')
});

//handling request for showcompforstudent.html to show all company registered for particular student
app.get('/showcompforstudent.html',(req,res)=>{
    res.render('showforstu')
});

//handling request for showstuforcompany.html to show all student registered for particular company
app.get('/showstuforcompany.html',(req,res)=>{
    res.render('showforcomp')
});

//handling request to show result from removeStudent
app.get('/show.html',async(req,res)=>{
    //console.log(post[0].name);
    var que={'name':post[0].name,
             'department':post[0].department,
             'rollno':post[0].rollno,
             'cgpa':post[0].cgpa};

    res.render('show',que)
});

//handling request to show result from removeCompany page
app.get('/showcomp.html',async(req,res)=>{
    //console.log(post[0].name);
    var que={'name':postcomp[0].name,
             'profile':postcomp[0].profile,
             'location':postcomp[0].location,
             'package':postcomp[0].package};

    res.render('showcomp',que)
});

//handling request to show result from unregister student from company
app.get('/showstucomp.html',async(req,res)=>{
    //console.log(poststucomp);
    var que={'name':poststucomp[0].company,
             'rollno':poststucomp[0].rollno};

    res.render('showstucomp',que)
});

//handling request to show result from searchStudent page
app.get('/show1.html',async(req,res)=>{
    //console.log(post[0].name);
    var que={'name':post[0].name,
             'department':post[0].department,
             'rollno':post[0].rollno,
             'cgpa':post[0].cgpa};
    
    res.render('show1',que)
});

//handling request to show result from editStudent page
app.get('/show2.html',async(req,res)=>{
    //console.log(post[0].name);
    var que={'name':post[0].name,
             'department':post[0].department,
             'rollno':post[0].rollno,
             'cgpa':post[0].cgpa};
    
    res.render('show2',que)
});

//handling request to show result after student is successfully stored
app.get('/addstushow.html',async(req,res)=>{
    //console.log(post);
    var que={'name':post.name,
             'department':post.department,
             'rollno':post.rollno,
             'cgpa':post.cgpa};
    
    res.render('addstushow',que)
    
});

//handling request to show result after company is successfully stored 
app.get('/addcompshow.html',async(req,res)=>{
    //console.log(post);
    var que={'name':postcomp.name,
             'profile':postcomp.profile,
             'location':postcomp.location,
             'package':postcomp.package};
            
    res.render('addcompshow',que)
    
});

//handling request to show result after student is successfully registered for company
app.get('/addcompstushow.html',async(req,res)=>{
   //console.log(poststucomp);
    var que={'name':poststucomp.company,
             'rollno':poststucomp.rollno};
            
    res.render('addcompstushow',que)
    
});

//handling post request from addstudent page to store student data
app.post('/post/store',async(req,res)=>{
    //console.log(req.body);
    if(req.body)
    {
        post=req.body;
    }
    //res.redirect('/index.html');
    
    //inserting data in database
    stu.create(req.body,(err,post)=>{
       // res.redirect('/index.html')
        res.redirect('/addstushow.html')
    });
    
});

//handling post request from addcompany page to store company data
app.post('/post/store1',(req,res)=>{
    //console.log(req.body);
    if(req.body)
    {
        postcomp=req.body;
    }
    
    //inserting data in database
    comp.create(req.body,(err,post)=>{
        //res.redirect('/index.html')
        res.redirect('/addcompshow.html')
    });
    
});


//handling post request from regstu page to register student for a company
app.post('/post/store2',(req,res)=>{
    //console.log(req.body);
    if(req.body)
    {
        poststucomp=req.body;
    }
    //res.redirect('/index.html');
    //inserting data in database
    compstu.create(req.body,(err,post)=>{
       // res.redirect('/index.html')
        res.redirect('/addcompstushow.html')
    });
    
});

//handling post request for removing student from database
app.post('/post/rem',async(req,res)=>{
    //console.log(req.body);
    var query;
	if(req.body){	
		query=req.body;
    }

    //finding it in database
    post=await stu.find(query);
  
   //redirect to appropriate page
    res.redirect('/show.html')
  
});

//handling post request for removing company from database
app.post('/post/remcomp',async(req,res)=>{
    //console.log(req.body);
    var query;
	if(req.body){	
		query=req.body;
    }

    //finding it in database
    postcomp=await comp.find(query);

   // //redirect to appropriate page
    res.redirect('/showcomp.html')
  
});

//handling post request for unregister student from any company from database
app.post('/post/remstucomp',async(req,res)=>{
    //console.log(req.body);
    var query;
	if(req.body){	
		query=req.body;
    }

    //finding it in database
    poststucomp=await compstu.find(query);
    
    
    //console.log(poststucomp);

    //redirect to appropriate page
    res.redirect('/showstucomp.html')
  
});


//handling post request for searching student from database
app.post('/post/rem1',async(req,res)=>{
    ///console.log(req.body);
    var query;
	if(req.body){	
		query=req.body;
    }

    //finding it in database
    post=await stu.find(query);

   //redirect to appropriate page
    res.redirect('/show1.html')
    
});

//handling post request for editing student from database
app.post('/post/rem2',async(req,res)=>{
    //console.log(req.body);
    var query;
	if(req.body){	
		query=req.body;
    }

    //finding it in database
    post=await stu.find(query);

   //redirect to appropriate page
    res.redirect('/show2.html')
    
});

//handling post request for deleting student from database
app.post('/post/rem3',async(req,res)=>{
    //console.log(req.body);
    var query;
	if(req.body){	
		query=req.body;
    }

    //delete all records where student was registered for company
    compstu.deleteMany(query, function(err, obj) {
        if (err) throw err;
        console.log("all document deleted");
      });

      //deleting student record
    stu.deleteOne(query, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.redirect('/index.html')
      });
   // console.log(post); 
});

//handling post request for deleting company from database
app.post('/post/remcomp1',async(req,res)=>{
    //console.log(req.body);
    var query;
	if(req.body){	
		query=req.body;
    }
    var we={company:req.body.name}

    //delete all records where compnay was registered by student
    compstu.deleteMany(we, function(err, obj) {
        if (err) throw err;
        console.log("all document deleted");
      });

     //deleting company record
    comp.deleteOne(query, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.redirect('/index.html')
      });
   // console.log(post); 
});

//handling post request for unregisterung student from company
app.post('/post/remcomp2',async(req,res)=>{
    //console.log(req.body);
    var query;
	if(req.body){	
		query=req.body;
    }

    //deleting the record
    compstu.deleteOne(query, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.redirect('/index.html')
      });
   // console.log(post); 
});

//handling post request for updating student record
app.post('/post/rem4',async(req,res)=>{
   // console.log(req.body);
    var ini;
	if(req.body){	
		ini=req.body.rollno;
    }
    //console.log(ini);
    var myquery = { rollno: ini };
    //console.log(myquery);
    var newvalues = { $set: req.body };
   // console.log(newvalues);

   //updating record with new values
    stu.updateOne(myquery, req.body, function(err, res) {
        if (err) {
            res.send("This shorterUrl does not exist.");
        }
        else {
            console.log("1 document updated");
        }
        
    });
    res.redirect('/index.html');
    
});

//handling post request for showing result of all company registered by any student
app.post('/post/show1',async(req,res)=>{
    //console.log(req.body);
    var query;
	if(req.body){	
		query=req.body;
    }

    //finding it in database
    poststucomp=await compstu.find(query);
   // console.log(post);

   //redirect to appropriate page
    res.redirect('/showstu.html')
    
});

//hangling request to show all company registed for the student
app.get('/showstu.html',async(req,res)=>{
    //console.log(poststucomp);
    res.render('showstu',{posts: poststucomp});
});

//handling post request for showing result of all student registered to any company
app.post('/post/show2',async(req,res)=>{
    //console.log(req.body);
    var query;
	if(req.body){	
		query=req.body;
    }
    var m1={company:req.body.name}

    //finding it in database
    poststucomp=await compstu.find(m1);
    
    //redirect to appropriate page
    res.redirect('/showcomp1.html')
   // res.redirect('/index.html')
    
});

//hangling request to show all student registered to any company
app.get('/showcomp1.html',async(req,res)=>{
    //console.log(poststucomp);
    res.render('showcom',{posts: poststucomp});
    //res.render('index')
});

//connecting to database
mongoose.connect('mongodb://localhost/Hamid');

//Listening to client
app.listen(3000,()=>{
    console.log('Listening on port 3000');
});

