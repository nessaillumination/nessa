import mongoose from 'mongoose';

const supportSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        trim: true
    },
    companyName:{
        type: String,
        required: true,

    },
    phoneNumber:{
        type: String,
        required: true,
        match: /^\+[0-9]{1,3}\s?[-.\s]?[0-9]{1,15}$/
    },
    productName: {
        type: String,
        required: true
    },
    productSKUId:{
        type: String,
        required: true
    },
    fileLink: { 
        type: String 
    },
    message: { 
        type: String, 
        required: true 
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    isSpam: {
        type: Boolean,
        default: false,
    },
    isSolved: {
        type: Boolean,
        default: false,
    }
},{timestamps: true});

export default mongoose.model('Support', supportSchema);