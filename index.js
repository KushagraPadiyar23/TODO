const { urlencoded } = require('body-parser');
const  express=require('express');
const { appendFile } = require('fs');
const { title } = require('process');

const port=8007;
const db=require('./config/mongoose');
const Todo=require('./model/task');
const app=express();
//app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(express.static('assets'));

//home page
app.get('/',function(req,res){

    Todo.find({},function(err,todos){
        if(err)
        {
            console.log('error occured while fetching the taks');
            return;
        }
        return res.render('home',{title:"My To-Do List",
                                  tasks:todos});
    });
   
});

//crateing a task
app.post('/create-task',function(req,res){
    console.log(req.body.task);
    console.log(req.body.category);
    console.log(req.body.duedate);
    Todo.create({
        task:req.body.task,
        category:req.body.category,
        duedate:req.body.duedate
    },function(err,newTask){
        if(err)
        {
            console.log("error occured in creating a task");
            return;
        }
        console.log("********",newTask);
        //return res.redirect('back');
    });
    return res.redirect('back');
  
});

//deleting a task
app.get('/delete-task/',function(req,res){

    
    let id=req.query;
    var count=Object.keys(id).length;
    for(let i=0;i<count;i++)
    {
        Todo.findByIdAndDelete(Object.keys(id)[i],function(err){
            if(err)
            {
                console.log("error occured while deleting the contact");
                return;
            }
            return res.redirect('back');
        });
    }
});

//firing the server
app.listen(port,function(err){
    if(err)
        console.log(`Error occured in firing the express server: ${err}`);
     console.log(`server up and running on port: ${port}`);   
})