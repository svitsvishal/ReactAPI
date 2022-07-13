const router = require('express').Router();
//regist
const CryptoJS =require('crypto-js') 

const jwt = require("jsonwebtoken");
const user =require('../models/User')
router.post('/register', async (req, res,)=>{

    const newUser = new user({
        username: req.body.username,    
        password: CryptoJS.AES.encrypt(
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

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                userName: req.body.user_name
            }
        );

        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});
           
module.exports = router;