console.log("hello world 2");

const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

const userRoute= require('./routes/user');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("successfully connected");
}).catch(err => console.log("error connecting   to server: " + err.message));
const app = express();

// app.get('/api/test', (req, res) => {
//  console.log('api call successfully');
// })

app.use('/api/users', userRoute)
app.listen( process.env.PORT || 5000, () => {

    console.log("hello world");
})