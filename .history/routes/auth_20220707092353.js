const router = require('express').Router();
//regist

const user =require('../models/User')
router.post('/register', async (req, res,)=>{

    const newUser = new user({
        username: req.body.username,    
        password: req.body.password,
        email : req.body.email
    })

    try 
    {    
        const user =await newUser.save(); 
 
        console.log(user)
        res.status(200).json({ message:'register success', user:user});
    } 
    catch (e) { 
        
    res.status(404).json({messages  : [e.message]});
    }

  
} );

           
module.exports = router;