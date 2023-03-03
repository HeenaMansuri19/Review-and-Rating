const joi = require("joi")
const Joi = require("joi").extend(require("@joi/date"))

const reviewSchema = {
    addReview: joi.object({
        addReview: joi.string().required(),
        subject: joi.string().required(),
        enterYourReview: joi.string().required(),
        rating: joi.number().max(3).required(),
        company_id: joi.string().required(),
        user_id: joi.string().required(),
    }).unknown(true)
}

module.exports = {
    reviewSchema
}










































