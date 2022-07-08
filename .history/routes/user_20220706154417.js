const router = require('express').Router();

router.get('/usertest', function (req, res) 
           {   
            res.send('tested user')
            }); 

router.post('/userpost', function (req, res) {
   // const username =req.body.username;
    console.log('vosj');
} )

           
module.exports = router;