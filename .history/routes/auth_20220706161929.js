const router = require('express').Router();
//regist

const user =require('../models/User')
router.post('/register', (req, res,)=>{

    const user = new User({
        username: req.body.username,    
        password: req.body.password,
        email : req.body.email
    })
} );

           
module.exports = router;