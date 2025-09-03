import mongoose from "mongoose";
import { MEDIA_TYPES } from "../constant/application.js";

const mediaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    resource_type:{
        type:String,
        enum:
        [
            MEDIA_TYPES.PRESS_RELEASE,
            MEDIA_TYPES.MEDIA_COVERAGE,
            MEDIA_TYPES.EVENTS_AND_EXHIBITION,
            MEDIA_TYPES.MEDIA_KIT,
            MEDIA_TYPES.VIDEOS,
        ]
    },
    slug:{
        type:String
    },
    description: {
        type: String,
        required: true
    },
    thumbnailImage: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
}, { timestamps: true })

export default mongoose.model('Media', mediaSchema);

