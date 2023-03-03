const express = require('express');
const router = express.Router()
const user = require('../controllers/userControllers')
const { upload } = require('../middlewares/imageStorage');
const userModelSchema = require('../models/userModelSchema');
const validation = require('../validation/users/user_validation')
//const auth = require('../middlewares/auth_middleware')


router.post("/register",
    upload.single("profilePic"),
    validation.registerUserValidation,
    user.userSignUp)
router.post("/userSignIn",
    validation.loginUserValidation,
    user.userSignIn)
router.post("/resetPassEmail", user.sendUserResetPasswordEmail)
router.post("/passwordReset/:id/:token", user.userPasswordReset)


module.exports = router;