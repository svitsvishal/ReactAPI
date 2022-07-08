const router = require('express').Router();

router.get('/usertest', function (req, res) 
           {   
            res.send('tested user')
            }); 