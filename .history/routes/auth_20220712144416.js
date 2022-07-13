const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { rawListeners } = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
    console.log(req.body.username)
   
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    isAdmin :req.body.isAdmin,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

// router.post('/login',async (req, res) => {  

//   try{
//     const user =await User.findOne({
//       username : req.body.username  
//      });
//      !user &&  res.sendStatus(401).json('user not found')
//      const hashedPassword = CryptoJS.AES.decrypt(
//       user.password, 
//       process.env.PASS_SEC);

//       const password = hashedPassword.toString(CryptoJS.enc.Utf8);

//      // const password = hashedPassword.toString(CryptoJS.enc.Utf8);

//     if(password !== req.body.password)
//     {
//       return res.status(401).json('invalid password');
//     }  //&& res.sendStatus(401).json('wrong password');
    
//      console.log(password + " user password");
//      res.status(200).json(user);
//   }catch (err) { 
//     res.status(500).json(err);
//    }
// })

router.post('/login', async (req, res) => {
    try{
     /// console.log(req.body.username)
        const user = await User.findOne(
            {
                userName: req.body.username
            }
        );
       console.log(user);
        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        console.log(req.body.password);
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
        res.sendStatus(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;