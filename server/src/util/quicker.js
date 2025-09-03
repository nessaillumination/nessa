import os from 'os'
import config from '../config/config.js'
import bcrypt from 'bcryptjs'
import { parsePhoneNumber } from 'libphonenumber-js'
import { getTimezonesForCountry } from 'countries-and-timezones'
import { v4 } from 'uuid'
import { randomInt } from 'crypto'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import axios from 'axios'
import {
    ExternalApiUrls,
    EProductCategories,
    EACLightingSubCategories,
    EElectronicsSubCategories,
    ESolarSubCategories,
    EHybridLightsSubCategories,
    EIndoorLightingSubCategories,
    ESolutionsSubCategories,
    ESmartLightingSolutions
} from '../constant/application.js'

export default {
    getSystemHealth: () => {
        return {
            cpuUsage: os.loadavg(),
            totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
            freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`
        }
    },
    getApplicationHealth: () => {
        return {
            environment: config.ENV,
            uptime: `${process.uptime().toFixed(2)} Seconds`,
            memoryUsage: {
                heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
                heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
            }
        }
    },
    parsePhoneNumber: (phoneNumber) => {
        try {
            const parsedContactNumber = parsePhoneNumber(phoneNumber)
            if (parsedContactNumber) {
                return {
                    countryCode: parsedContactNumber.countryCallingCode,
                    isoCode: parsedContactNumber.country || null,
                    internationalNumber: parsedContactNumber.formatInternational()
                }
            }

            return {
                countryCode: null,
                isoCode: null,
                internationalNumber: null
            }
        } catch (err) {
            return {
                countryCode: null,
                isoCode: null,
                internationalNumber: null
            }
        }
    },
    hashPassword: (password) => {
        return bcrypt.hash(password, 10)
    },
    comparePassword: (attemptedPassword, encPassword) => {
        return bcrypt.compare(attemptedPassword, encPassword)
    },
    countryTimezone: (isoCode) => {
        return getTimezonesForCountry(isoCode)
    },
    generateRandomId: () => v4(),
    generateOtp: (length) => {
        const min = Math.pow(10, length - 1)
        const max = Math.pow(10, length) - 1

        return randomInt(min, max + 1).toString()
    },
    generateToken: (payload, secret, expiry) => {
        return jwt.sign(payload, secret, {
            expiresIn: expiry
        })
    },
    verifyToken: (token, secret) => {
        return jwt.verify(token, secret)
    },
    getDomainFromUrl: (url) => {
        try {
            const parsedUrl = new URL(url)
            return parsedUrl.hostname
        } catch (err) {
            throw err
        }
    },
    generateResetPasswordExpiry: (minute) => {
        return dayjs().valueOf() + minute * 60 * 1000
    },
    getLocationDetails: async () => {
        try {
            const res = await axios.get(ExternalApiUrls.LOCATION_DETAILS)
            if (res && res.data) {
                return res.data
            }
            return null
        } catch (error) {
            return null
        }
    },
    subCategoriesMap: {
        [EProductCategories.AC_LIGHTING]: Object.values(EACLightingSubCategories),
        [EProductCategories.SOLAR]: Object.values(ESolarSubCategories),
        [EProductCategories.ELECTRONICS]: Object.values(EElectronicsSubCategories),
        [EProductCategories.HYBRID_LIGHTS]: Object.values(EHybridLightsSubCategories),
        [EProductCategories.INDOOR_LIGHTING]: Object.values(EIndoorLightingSubCategories),
        [EProductCategories.SOLUTIONS]: Object.values(ESolutionsSubCategories),
        [EProductCategories.SMART_LIGHTING_SOLUTION]: Object.values(ESmartLightingSolutions)
    },
    apiDetailsStatus : [
        {
            title: "Save Location Statistics",
            status: "Published",
            category: "Location Statistics Service",
            description: "API to save statistical data related to specific locations, such as visitor counts, user interactions, or other location-based metrics."
        },
        {
            title: "Get Location Details",
            status: "Published",
            category: "Location Statistics Service",
            description: "API to retrieve detailed information about a specific location, including its associated statistics, geographical data, and metadata."
        },
        {
            title: "Website Count",
            status: "Published",
            category: "Location Statistics Service",
            description: "API to fetch the total count of websites, platforms, or services associated with a location or geographical area."
        },
        {
            title: "Upload Files",
            status: "Published",
            category: "File Upload Service",
            description: "API service for securely uploading files, such as images, documents, or multimedia, to the server for storage and processing."
        },
        {
            title: "Add Product",
            status: "Published",
            category: "Product Service",
            description: "API service to create and save a new product in the database, including its details such as name, price, description, and category."
        },
        {
            title: "Query Product Data",
            status: "Published",
            category: "Product Service",
            description: "API service to search, filter, and retrieve product information based on criteria like product ID, keywords, or other relevant attributes."
        },
        {
            title: "Update Product Details",
            status: "Published",
            category: "Product Service",
            description: "API service to update the details of an existing product, including price, description, inventory count, and other attributes using its unique ID."
        },
        {
            title: "Delete Product",
            status: "Published",
            category: "Product Service",
            description: "API service to delete a product from the database using its unique product ID, removing it from the system."
        },
        {
            title: "Increase Enquiry Count",
            status: "Published",
            category: "Product Service",
            description: "API service to increment the enquiry count for a specific product by its ID, helping track user interest and engagement."
        },
        {
            title: "Add Utilities Data",
            status: "Published",
            category: "Utilities Data Service",
            description: "API service to add utility-related data, such as configurations, metadata, or system settings, into the system for management and processing."
        },
        {
            title: "Fetch Utilities Data",
            status: "Published",
            category: "Utilities Data Service",
            description: "API service to retrieve utility data by its unique ID, including associated configurations, settings, and metadata for specific resources."
        },
        {
            title: "Update Utilities Data",
            status: "Published",
            category: "Utilities Data Service",
            description: "API service to modify or update existing utility data, ensuring data accuracy, relevance, and proper configuration using its unique ID."
        },
        {
            title: "Delete Utilities Data",
            status: "Published",
            category: "Utilities Data Service",
            description: "API service to delete utility data by its ID, removing outdated, irrelevant, or unnecessary records from the system."
        },
        {
            title: "Contact Us Form",
            status: "Published",
            category: "Contact Us Service",
            description: "API service to handle contact form submissions, including processing and sending form data via email or storing it for future follow-up."
        },
        {
            title: "Query Contact Form Submissions",
            status: "Published",
            category: "Contact Us Service",
            description: "API service to retrieve contact form submissions with options to filter, sort, and paginate the data based on criteria like subject, isRead, isSpam, and isSolved statuses."
        },
        {
            title: "Update isRead or isSpam or isSolved status",
            status: "Published",
            category: "Contact Us Service",
            description: "API service to update the status of a contact form submission, allowing the modification of fields such as isRead, isSpam, or isSolved for better tracking and organization."
        },
        {
            title: "Support Form",
            status: "Published",
            category: "Support Service",
            description: "API service to manage support form submissions, enabling customers to report issues and receive support, including email notifications or ticket generation."
        },
        {
            title: "Fetch Support Form Data",
            status: "Published",
            category: "Support Service",
            description: "API service to retrieve support form submissions with options to filter, sort, and paginate based on criteria such as priority, status, or issue category."
        },
        {
            title: "Update Support Form Status",
            status: "Published",
            category: "Support Service",
            description: "API service to update the status or priority of a support form submission, enabling better tracking and resolution of customer-reported issues."
        }        
    ]
    
    
}

