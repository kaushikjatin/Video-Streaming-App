const express= require('express')
const cors= require('cors') // this module will help us to process the cross origin requsts
const bodyparser = require('body-parser')
const app=express(); 
const mongoose = require('mongoose')
const url = `mongodb+srv://kaushikjatin:R070573k@cluster0.kzavz.mongodb.net/VideoStreamingApp?retryWrites=true&w=majority`;
const path = require('path');
const busboy = require('connect-busboy');
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
if(process.env.NODE_ENV!='production') require('dotenv').config()




mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })



app.use(cors())
app.use(bodyparser.json()) //this middleware will convert the body of every request to the json format
app.use(bodyparser.urlencoded({extended:true})) // this will remove all extra space and other symbols from the request url.
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));


app.use('/api/thumbnails',express.static(path.join(__dirname,'UPLOADS/THUMBNAILS')))


app.use('/user/auth',require('./router/SIgnIn_SignUp'));
app.use('/user/videos',require('./router/VideoFiles'));


if(process.env.NODE_ENV=='production')
{
    app.use(express.static(path.join(__dirname,'client/build')));

    app.get('*',function(req,res){
        res.sendFile(path.join(__dirname,'client/build/index.html'));
    })
}


// if(process.env.NODE_ENV!='production') require('dotenv').config() 	// this line sets the environment variables
// const port = process.env.PORT || 5000		// if it it hosted on heroku then it will take the port of heroku otherwise 5000

const port = process.env.PORT || 8000
app.listen(port);
