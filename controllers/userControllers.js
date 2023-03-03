const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../services/emailService");
const userModelSchema = require("../models/userModelSchema");

//1.usersignUp API(registeration is done)
const userSignUp = async (req, res) => {
    try {
        console.log(req.body.userEmail)
        const isEmailExists = await userModelSchema.findOne({ userEmail: req.body.userEmail });
        if (isEmailExists) {
            res.status(409).json({
                success: "failure",
                message: "Email already exists for this user",
            });
        }
        else {
            const userSignUp = await new userModelSchema(req.body)
            try {
                const salt = await bcrypt.genSalt(10);
                userSignUp.password = await bcrypt.hash(req.body.password, salt);
                const filePath = `/uploads/${req.file.filename}`;
                userSignUp.profilePic = filePath;
                userSignUp.save();
                res.status(201).json({
                    success: "success",
                    message: "Registration for new user is successful"
                });
            }
            catch (err) {
                res.status(400).json({
                    success: "failure",
                    error: err.message,
                });
            }
        }
    } catch (err) {
        console.log(err)
    }
}

//2.usersignin(login is done)
const userSignIn = async (req, res) => {
    try {
        const { userEmail, password } = req.body;
        if (userEmail && password) {
            const user = await userModelSchema.findOne({ userEmail: userEmail });
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (user.userEmail === userEmail && isMatch) {
                    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    res.status(200).send({
                        success: "success",
                        message: " User has login successfully ",
                        token: token
                    });
                } else {
                    res.status(401).send({
                        success: "failure",
                        message: "Email or password is not valid",
                    });
                }
            } else {
                res.status(401).send({
                    success: "failure",
                    message: "You are not a register user"
                });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};

//3.User send Email for Reset Password API
const sendUserResetPasswordEmail = async (req, res) => {
    const { userEmail } = req.body;
    try {
        const user = await userModelSchema.findOne({ userEmail: userEmail });
        if (user != null) {
            const secret = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ userID: user._id }, secret, {
                expiresIn: "20m"
            });
            const emailSend = sendEmail(userEmail, token)
            return res.status(201).json({
                success: "success",
                message: "Email sent Succcesfully",
                token: token,
                userID: user._id,
            });
        } else {
            res.status(403).json({
                success: "failure",
                message: "Email user is not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: "failure",
            message: err.message,
        });
    }
};

//4.User Reset password ApI
const userPasswordReset = async (req, res) => {
    const { id, token } = req.params;
    console.log(id)
    console.log(token)
    const { newPassword, confirmPasssword } = req.body;
    try {
        const checkUser = await userModelSchema.findById(id);
        if (checkUser != null) {
            const secretKey = process.env.JWT_SECRET_KEY;
            jwt.verify(token, secretKey);
            if (newPassword === confirmPasssword) {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(confirmPasssword, salt);
                await userModelSchema.findByIdAndUpdate(checkUser._id, {
                    $set: { password: password },
                });
                res.status(200).json({
                    success: "Success",
                    message: "Password update Succesfully",
                });
            } else {
                res.status(403).json({
                    success: "failure",
                    message: "Password and confirm password is not match",
                });
            }
        } else {
            res.status(403).json({
                success: "failure",
                message: " Email is not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: "failure",
            message: err.message,
        });
    }
};

module.exports = {
    userSignUp,
    userSignIn,
    sendUserResetPasswordEmail,
    userPasswordReset,
}
