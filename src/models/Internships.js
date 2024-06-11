const mongoose = require('mongoose')

const InternshipSchema = mongoose.Schema({
    company_title : {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: false
    },
    description : {
        type: String,
        required: true
    },
    duration : {
        type: String,
        required: true
    },
    eligibilityCriteria : {
        type: String,
        required: true
    },
    url : {
        type: String,
        required: true
    },
}, {timestamps: true});

export default mongoose.models.internships || mongoose.model("internships", InternshipSchema);