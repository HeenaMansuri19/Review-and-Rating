const reviewModelSchema = require("../models/reviewModelSchema")
const mongoose = require('mongoose');
const { reset } = require("nodemon");


//1.addReview
const addReview = async (req, res) => {
    try {
        // console.log(req.body.review)
        const isReviewExists = await reviewModelSchema.findOne({ user_id: req.body.user_id });
        if (isReviewExists) {
            res.status(409).json({
                success: "failure",
                message: "Review is already exists you can give another review",
            });
        } else {
            const addReview = await new reviewModelSchema(req.body)
            try {
                addReview.save()
                res.status(201).json({
                    success: "success",
                    message: "Thank you for your review.Review saved successfully "
                });
            } catch (err) {
                res.status(400).json({
                    success: "failure",
                    message: "error occur" + err.message
                });
            }
        }
    } catch (err) {
        console.log(err.message)
    }
}

//------Crud operation in review----------
//(1)editReview api
const editReview = async (req, res) => {
    const id = req.params;
    try {
        const newReview = await reviewModelSchema.findByIdAndUpdate(id, { $set: req.body });
        newReview.save();
        res.status(201).json({
            success: "success",
            message: "Review edit successfully"
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            error: err.message,
        });
    }
}

//(2)delReview api
const deleteReview = async (req, res) => {
    const id = req.params;
    try {
        const deleteReview = await reviewModelSchema.findByIdAndDelete(id, { $set: req.body });
        deleteReview.delete();
        res.status(201).json({
            success: "success",
            message: " Review is delete"
        })
    } catch (err) {
        res.status(400).json({
            success: "failure",
            error: err.message,
        });
    }
}

//(3)reviewList api
const reviewList = async (req, res) => {
    try {
        const listReview = await reviewModelSchema.find();
        res.status(201).json({
            success: "success",
            message: "Thank you for your review and the review lists are shown here!",
            data: listReview
        });
    } catch (err) {
        res.status(400).json({
            success: "success",
            error: err.message,
        });
    }
}

//(4)reviewDetails api
const reviewDetails = async (req, res) => {
    const id = req.params.id;
    try {
        const findDetail = await reviewModelSchema.findById(req.params.id).populate({
            path: "company_id",
            select: { "companyName": 1, "companyId": 1 }
        });
        return res.status(201).json({
            success: "failure",
            message: "The details of review are here!",
            data: findDetail
        });
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    addReview,
    editReview,
    deleteReview,
    reviewList,
    reviewDetails
}
