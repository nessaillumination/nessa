import mongoose from 'mongoose';

const utilsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    utilsData: {
        type: Object,
        required: true,
    }
},{timestamps: true});

export default mongoose.model('Utils', utilsSchema);