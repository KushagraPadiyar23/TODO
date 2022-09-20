const mongoose=require('mongoose');
const todoschema=new mongoose.Schema(
    {
        task:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        duedate:{
            type:Date,
            required:true
        }
    }
);
const Todo=mongoose.model('Todo',todoschema);
module.exports=Todo;