import mongoose from "mongoose";
import { BLOG_TYPES } from "../constant/application.js";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    resource_type:{
        type:String,
        enum:
        [
            BLOG_TYPES.ARTICLES,
            BLOG_TYPES.CASE_STUDIES,
            BLOG_TYPES.WHITE_PAPERS,
            BLOG_TYPES.BLOGS,
            BLOG_TYPES.OTHERS,
        ]
    },
    slug:{
        type:String
    },
    tag: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailImage: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true })

export default mongoose.model('Blog', blogSchema);

