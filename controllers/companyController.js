const compModelSchema = require("../models/compModelSchema");
const reviewModelSchema = require("../models/reviewModelSchema");

//1. addCompany API
const addCompany = async (req, res) => {
    try {
        console.log(req.body.companyName)
        const isCompanyExists = await compModelSchema.findOne({ companyName: req.body.companyName });
        if (isCompanyExists) {
            res.status(409).json({
                status: "failure",
                message: "Company is already exist",
            });
        }
        else {
            const addCompany = await new compModelSchema(req.body)
            const filePath = `/uploads/${req.file.filename}`;
            addCompany.company_logo = filePath;
            try {
                addCompany.save();
                res.status(201).json({
                    success: "success",
                    message: "Data save successfully",
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

//2.getCompany API
const getCompany = async (req, res) => {
    try {
        const existsComp = await compModelSchema.find();
        res.status(200).json({
            success: "success",
            message: "The displayed lists of company are",
            data: existsComp,
        })
    } catch (error) {
        console.log(error.message);
    }
};

//3. compDetail API 
const compDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const detailCompany = await compModelSchema.findById(id)
        const reviewDetail = await reviewModelSchema.find({ company_id: id })
            .populate({
                path: "user_id",
                select: "userName profilePic city createdAt"
            })
            .populate({
                path: "company_id",
                select: "companyName location foundedOn company_logo city"
            });
        const companyAndReview = {
            detail: detailCompany,
            reviewDetail: reviewDetail
        }
        res.status(200).json({
            success: "Success",
            message: "Here is the details of company and review",
            data: companyAndReview
        });
    } catch (error) {
        console.log(error);
    }
}

//4.searchDetail API
const searchDetail = async (req, res) => {
    try {
        const searchCompany = await compModelSchema.find({ city: req.body.city });
        res.status(200).json({
            success: "success",
            message: "Search list of company are here",
            data: searchCompany,
        })
    } catch (error) {
        console.log(error.message);
    }
};


module.exports = {
    addCompany,
    getCompany,
    compDetail,
    searchDetail
}
