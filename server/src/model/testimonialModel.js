import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
},{timestamps:true});

export default mongoose.model('Testimonials', testimonialSchema);