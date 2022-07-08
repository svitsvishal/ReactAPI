const router = require('express').Router();
//regist

const user =require('../models/User')
router.post('/register', async (req, res,)=>{

    const newUser = new User({
        username: req.body.username,    
        password: req.body.password,
        email : req.body.email
    })

    try 
    {    
        const user =await newUser.save(); 
        console.log(user)
        res.send(user);
    } 
    catch (e) { returnIndex = false}

  
} );

           
module.exports = router;