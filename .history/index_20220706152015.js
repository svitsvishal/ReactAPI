console.log("hello world 2");

const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("successfully connected");
}).catch(err => console.log("error connecting   to server: " + err.message));
const app = express();

app.listen(5000, () => {

    console.log("hello world");
})