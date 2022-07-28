console.log("hello world 2");
app.use(cors());
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute= require('./routes/user');
const authRoute =require('./routes/auth');
const productsRoute =require('./routes/product');
const cartRoute =require('./routes/cart');
const orderRoute    =require('./routes/order');
const stripetRoute =require('./routes/stripe');
const cors = require("cors");

dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("successfully connected");
}).catch(err => console.log("error connecting   to server: " + err.message));
const app = express();


// app.get('/api/test', (req, res) => {
//  console.log('api call successfully');
// })

app.use(express.json()); // use for json post Requested
app.use('/api/users', userRoute)

app.use('/api/auth',authRoute)
app.use('/api/products',productsRoute)

app.use('/api/cart', cartRoute)

app.use('/api/orders',orderRoute)

app.use('/api/checkout',stripetRoute)
app.listen( process.env.PORT || 5000, () => {

    console.log("hello world");
})