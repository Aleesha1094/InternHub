const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address!'],
    },
    password : {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long!'],
    },
    username : {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "admin",
    },
});

export default mongoose.models.admins || mongoose.model("admins", AdminSchema);