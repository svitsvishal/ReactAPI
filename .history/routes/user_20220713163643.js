const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");
  const User = require("../models/User");
const router = require('express').Router();


//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  console.log(req.params.id)
  
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {
      console.log('trying to update')
      const updatedUser = await User.findByIdAndUpdate(      
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json("not found");
    }
  });
  
           

  //DETELE
  router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    console.log(req.params.id)   
    try{

   await User.findByIdAndDelete(req.params.id);
   res.status(200).json('user deleted');
      
    }catch (err) {  res.status(500).json("not found"); }
  
  })

  //Get user information
  router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    console.log(req.params.id)   
    try{

  const user=  await User.findById(req.params.id);   
       const { password, ...others } = user._doc; 
       res.status(200).json(others);

    }catch (err) {  res.status(500).json("not found"); }
  
  })

  //Get All users information
  router.get("/", verifyTokenAndAdmin, async (req, res) => {
 
    //http://localhost:5000/api/users?new=true
     const query =req.query.new
    try{

  const users= query ? await User.find ().sort({_id: -1}).limit(5) 
                      : await User.find();
      // const { password, ...others } = user._doc; 
       res.status(200).json(users);

    }catch (err) {  res.status(500).json("not found"); }
  
  })

  //Get user Stats
  router.get("/stats/", verifyTokenAndAdmin, async (req, res) => {
    try{

  const user=  await User.findOne()    
}
catch (err) { return  res.status(401).json('invalid password');  } 
    
})

module.exports = router;

// router.get('/usertest', function (req, res) 
//            {   
//             res.send('tested user')
//             }); 

// router.post('/userpost', function (req, res) {
//     const username =req.body.username;
//     console.log(username);
//     res.send("called userpost")
// } )