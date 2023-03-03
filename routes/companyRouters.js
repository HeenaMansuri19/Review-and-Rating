const express = require('express');
const router = express.Router()
const {upload} = require('../middlewares/imageStorage');
const { ValidationError } = require('@hapi/joi/lib/errors');
const validation = require ('../validation/company/company_validation')
const company = require('../controllers/companyController')

router.post("/addCompany",validation.addCompanyValidation,company.addCompany)
router.post("/addCompany1",upload.single("company_logo"),company.addCompany)
router.get("/getCompany",company.getCompany)
router.get("/searchCompany",company.searchDetail)
router.get("/compDetail/:id",company.compDetail)

module.exports = router;