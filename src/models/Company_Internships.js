const mongoose = require('mongoose')

const CInternshipSchema = mongoose.Schema({
    companyId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    title : {
        type: String,
        required: true
    },
    company_title : {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true
    },
    eligibilityCriteria: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    url : {
        type: String,
        required: true
    }, 
    contact_email : {
        type: String,
        required: true,
        trim: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address!'],
    },
    duration : {
        type: String,
        required: true
    },
}, {timestamps: true});

export default mongoose.models.c_internships || mongoose.model("c_internships", CInternshipSchema);