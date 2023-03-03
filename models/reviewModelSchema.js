const mongoose = require('mongoose')
const reviewModelSchema = new mongoose.Schema(
    {
        addReview: {
            type: String,
            required: true
        },

        subject: {
            type: String,
            required: true
        },

        enterYourReview: {
            type: String,
            required: true
        },
        
        rating: {
            type: Number,
            required: true
        },

        isActive: {
            type: String,
            required: true,
            default: true
        },
        company_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'company'
        },

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    })
reviewModelSchema.set('timestamps', true)
module.exports = mongoose.model('review', reviewModelSchema)