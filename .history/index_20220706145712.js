console.log("hello world 2");

const express = require('express');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://vishal:vishal@cluster0.cfdim.mongodb.net/shop?retryWrites=true&w=majority")
.then(()=>{
    console.log("successfully connected");
}).catch(err => console.log("error connecting   to server: " + err.message));
const app = express();

app.listen(5000, () => {

    console.log("hello world");
})