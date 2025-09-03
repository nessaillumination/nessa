import mongoose from 'mongoose';
import { EProductCategories } from '../constant/application.js';

const relatedProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    application: {
        type: String,
        default: ''
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', 
                required: true
            },
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ]
});


const solutionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        enum: Object.values(EProductCategories),
        required: true
    },
    subcategories: {
        type: String,
        unique: true,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    solutionImageUrl: {
        type: String,
        required: true
    },
    relatedProduct: [relatedProductSchema] 
}, { timestamps: true });

export default mongoose.model('Solutions', solutionSchema);
