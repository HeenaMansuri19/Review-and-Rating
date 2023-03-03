const joi = require("joi")
const Joi=require("joi").extend(require("@joi/date"))


const companySchema = {
    companyValidation: joi.object({
        companyName: joi.string().required(),
        companyId: joi.string().required(),
        city: joi.string().required(),
        location: joi.string().required(),
        foundedOn: Joi.date().format("DD/MM/YYYY").required(),
    }).unknown(true)
}

module.exports = 
    companySchema
