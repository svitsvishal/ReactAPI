const router = require('express').Router();
//regist
const cryptoJS =require('crypto-js') 
const user =require('../models/User')
router.post('/register', async (req, res,)=>{

    const newUser = new user({
        username: req.body.username,    
        password: rCryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
          ).toString(),
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