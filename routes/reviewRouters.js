const express = require('express');
const router = express.Router()
const { ValidationError } = require('@hapi/joi/lib/errors');
const review = require('../controllers/reviewController')
const validation = require('../validation/reviews/review_validation')

router.post('/addReview', validation.addReviewValidation, review.addReview)
router.patch('/editReview/:_id',validation.addReviewValidation,review.editReview)
router.delete('/deleteReview/:_id',validation.addReviewValidation,review.deleteReview)
router.get('/getList',review.reviewList)
router.get('/getDetails/:id',review.reviewDetails)          //review id dena hai

module.exports = router;