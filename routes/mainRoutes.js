const express = require('express');
const router = express.Router()
const user = require('./userRouters')
const company = require('./companyRouters')
const review  = require('./reviewRouters')

router.use('/user',user)
router.use('/company',company)
router.use('/review',review)

module.exports = router;