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
    city : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    c_url : {
        type: String,
        required: false
    }, 
    contact_email : {
        type: String,
        required: true,
        trim: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address!'],
    },
    end_date : {
        type: Date,
        required: true
    },
}, {timestamps: true});

export default mongoose.models.c_internships || mongoose.model("c_internships", CInternshipSchema);