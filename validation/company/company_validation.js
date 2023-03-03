const compModelSchema = require("../../models/compModelSchema")
const company = require("./company_schema")

module.exports = {
    addCompanyValidation: async (req, res, next) => {
        const value = await company.companyValidation.validate(req.body,{abortEarly:false})
        if (value.error) {
            res.json({
                succes: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    }
}