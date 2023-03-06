const mongoose = require('mongoose')
const userModelSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },

        userEmail: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        profilePic: {
            type: String,
             required: true
        },

        userRole: {
            type: String,
            required: true,
            default: 'user'
        },

        isActive: {
            type: String,
            required: true,
            default: true
        },
    })
userModelSchema.set('timestamps', true)
module.exports = mongoose.model('user', userModelSchema)