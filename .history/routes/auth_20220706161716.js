const router = require('express').Router();
//regist

const user =require('../models/User')
router.post('/', function(req, res, next) { next(); });

           
module.exports = router;