import mongoose from 'mongoose';

const locationStatsSchema = new mongoose.Schema({
    ipAddress: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    countryName: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
        required: true,
    },
    timeZone: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    cityName: {
        type: String,
        required: true,
    },
    regionName: {
        type: String,
        required: true,
    },
    isProxy: {
        type: Boolean,
        required: true,
    },
    continent: {
        type: String,
        required: true,
    },
    continentCode: {
        type: String,
        required: true,
    },
    currency: {
        code: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    language: {
        type: String,
        required: true,
    },
    timeZones: {
        type: [String], 
        required: true,
    },

    ipVersion: {
        type: Number,
        default: null, 
    },
    tlds: {
        type: [String], 
        default: null, 
    }
}, { timestamps: true });

export default mongoose.model('LocationStats', locationStatsSchema);
