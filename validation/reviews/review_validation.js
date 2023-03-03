const { addReview } = require("../../controllers/reviewController")
const reviewModelSchema = require("../../models/reviewModelSchema")
const review = require("./review_schema")


module.exports = {
    addReviewValidation: async (req, res, next) => {
        const value = await review.reviewSchema.addReview.validate(req.body, { abortEarly: false });
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    }
}




















































