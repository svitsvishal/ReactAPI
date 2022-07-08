console.log("hello world 2");

const express = require('express');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://vishal:vishal@cluster0.cfdim.mongodb.net/?retryWrites=true&w=majority")
const app = express();

app.listen(5000, () => {

    console.log("hello world");
})