const mongoose = require('mongoose')

const CompanySchema = mongoose.Schema({
    email : {
        type: String,
        required: true,
        trim: true, // Removes leading and trailing whitespaces
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address!'],
    },
    password : {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long!'],
    },
    company_name : {
        type: String,
        required: true
    },
    resetToken : {
        type: String,
        required: false
    },
    resetTokenExpiry : {
        type: Date,
        required: false
    },
    role: {
        type: String,
        required: false,
        default: "company",
    },
}, {timestamps: true});

export default mongoose.models.companies || mongoose.model("companies", CompanySchema);