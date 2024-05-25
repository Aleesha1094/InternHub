const mongoose = require('mongoose')

const FeedbackSchema = mongoose.Schema({
    user_email : {
        type: String,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address!'],
    },
    user_name : {
        type: String,
        required: true
    },
    subject : {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
}, {timestamps: true});

export default mongoose.models.feedbacks || mongoose.model("feedbacks", FeedbackSchema);