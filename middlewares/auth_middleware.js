const { string } = require('joi');
const jwt = require('jsonwebtoken')
const userSchema = require('../models/userModelSchema')

const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    console.log(req.headers);
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await userSchema.findById(userID).select('-password');
            next()
        } catch (err) {
            res.status(401).send({
                success: "failure",
                message: "Unauthorised User" + err.message
            })
        }
    }
    if (!token) {
        res.status(401).send({
            "message": "Unauthorised User No Token"
        })
    }
}

module.exports = { checkUserAuth };
