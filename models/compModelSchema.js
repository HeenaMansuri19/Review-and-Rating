const mongoose = require('mongoose')
const compModelSchema = new mongoose.Schema(
    {
        companyId: {
            type: String,
            required: true
        },

        companyName: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },
        
        city: {
            type: String,
            required: true
        },

        foundedOn: {
            type: Date,
            required: true

        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: "true",
            ref: 'users'
        },
        company_logo: {
            type: String,
        }
    })

compModelSchema.set('timestamps', true)
module.exports = mongoose.model('company', compModelSchema)