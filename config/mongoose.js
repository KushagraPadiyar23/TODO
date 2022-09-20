//require the library
const mongoose=require('mongoose');
//connect to the database
mongoose.connect("mongodb://localhost:/mongo-common");

//acquire the connection(to check if id is successful)
const db=mongoose.connection;

//error message
db.on('error',console.error.bind(console,'error connecting to the db'));

//on successful connection
db.once('open',function(){
    console.log("successfully connected to the database");
});