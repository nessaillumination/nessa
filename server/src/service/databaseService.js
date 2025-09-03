import mongoose from 'mongoose'
import config from '../config/config.js'
import locationStatsModel from '../model/locationStatsModel.js'
import productModel from '../model/productModel.js'
import utilsModel from '../model/utilsModel.js'
import contactUsModel from '../model/contactUsModel.js'
import supportModel from '../model/supportEnquiryModel.js'
import solutionModel from '../model/solutionModel.js'
import testimonialModel from '../model/testimonialModel.js'
import projectModel from '../model/projectModel.js'
import blogModel from '../model/blogModel.js'
import { DELETE_BY_TYPE } from '../constant/application.js'
import mediaModel from '../model/mediaModel.js'

export default {
    connect: async () => {
        try {
            await mongoose.connect(config.DATABASE_URL)
            return mongoose.connection
        } catch (err) {
            throw err
        }
    },
    savelocationStats: (payload) => {
        return locationStatsModel.create(payload)
    },
    getLocationStats: () => {
        return locationStatsModel.find()
    },
    saveProduct: (payload) => {
        return productModel.create(payload)
    },
    queryProductData: (findQuery, limit, offset) => {
        return productModel.find(findQuery).limit(Number(limit)).skip(Number(offset)).sort({ _id: 1 })
    },
    queryProductDataById: (id) => {
        return productModel.findById(id)
    },
    countDocuments: (findQuery) => {
        return productModel.countDocuments(findQuery)
    },
    updateProductById: (id, data) => {
        return productModel.findByIdAndUpdate(id, data, { new: true });
    },
    increaseIsEnquired: (id) => {
        return productModel.findByIdAndUpdate(
            id,
            { $inc: { isEnquired: 1 } },
            { new: true }
        );
    },
    saveUtilsData: (payload) => {
        return utilsModel.create(payload)
    },
    fetchUtilsData: (id) => {
        return utilsModel.findById(id);
    },
    updateUtilsData: (id, data) => {
        return utilsModel.findByIdAndUpdate(id, data, { new: true });
    },
    removeUtilsData: (id) => {
        return utilsModel.findByIdAndDelete(id);
    },
    fetchAllUtils: () => {
        return utilsModel.find()
    },
    saveContactUs: (payload) => {
        return contactUsModel.create(payload)
    },
    queryContactUsData: async (findQuery, limit, offset) => {
        return contactUsModel.find(findQuery)
            .skip(offset)
            .limit(limit);

    },
    countContactUsDocuments: (findQuery) => {
        return contactUsModel.countDocuments(findQuery);
    },
    updateContactUsById: (id, data) => {
        return contactUsModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    },
    saveSupportEnquiry: (payload) => {
        return supportModel.create(payload)
    },
    querySupportEnquiry: async (findQuery, limit, offset) => {
        return supportModel.find(findQuery)
            .skip(offset)
            .limit(limit);

    },
    countSupportEnquiryDocuments: (findQuery) => {
        return supportModel.countDocuments(findQuery);
    },
    updateSupportEnquiryById: (id, data) => {
        return supportModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    },
    saveSolutionData: (payload) => {
        return solutionModel.create(payload)
    },
    queryAllSolutions: () => {
        return solutionModel.find()
    },
    querySolutionById: (id) => {
        return solutionModel.findById(id)
    },
    updateSolutionData: (id, data) => {
        return solutionModel.findByIdAndUpdate(id, data, { new: true });
    },
    saveTestimonialData: (payload) => {
        return testimonialModel.create(payload)
    },
    queryAllTestimonials: () => {
        return testimonialModel.find()
    },
    updateTestimonialData: async (id) => {
        const testimonial = await testimonialModel.findById(id);

        if (testimonial) {
            testimonial.isPublished = !testimonial.isPublished;
            return await testimonial.save();
        }

        return null;
    },
    updateSingleTestimonialData: async (id, updatedData) => {
        return await testimonialModel.findByIdAndUpdate(id, updatedData, { new: true });
    },
    saveProjectData: (payload) => {
        return projectModel.create(payload)
    },
    queryAllProjects: () => {
        return projectModel.find()
    },
    saveBlog: (payload) => {
        return blogModel.create(payload)
    },
    updateBlogById: (id, data) => {
        return blogModel.findByIdAndUpdate(id, data, { new: true });
    },
    fetchAllBlogData: () => {
        return blogModel.find().sort({ createdAt: -1 })
    },
    queryBlogData: (findQuery, limit, offset) => {
        return blogModel.find(findQuery).limit(Number(limit)).skip(Number(offset)).sort({ createdAt: -1 })
    },
    countBlogDocuments: (findQuery) => {
        return blogModel.countDocuments(findQuery)
    },
    fetchBlog: (id) => {
        return blogModel.findById(id)
    },
    updateProjectData: async (id, updateData) => {
        const { projects, categories } = updateData;

        // Find the existing project document
        const existingProject = await projectModel.findById(id);

        if (!existingProject) {
            throw new Error('Project not found');
        }

        // Update categories if provided
        if (categories) {
            existingProject.categories = categories;
        }

        // Handle existing and new projects
        if (projects) {
            for (const updatedProject of projects) {
                if (updatedProject._id) {
                    // Update existing project
                    const existingProjectIndex = existingProject.projects.findIndex(
                        p => p._id.toString() === updatedProject._id.toString()
                    );

                    if (existingProjectIndex !== -1) {
                        existingProject.projects[existingProjectIndex] = {
                            ...existingProject.projects[existingProjectIndex],
                            ...updatedProject
                        };
                    }
                } else {
                    // Add new project
                    existingProject.projects.push({
                        title: updatedProject.title,
                        place: updatedProject.place,
                        imageUrl: updatedProject.imageUrl,
                        isPublished: updatedProject.isPublished
                    });
                }
            }
        }

        // Save and return the updated project
        return await existingProject.save();
    },

    saveMedia: (payload) => {
        return mediaModel.create(payload);
    },
    updateMediaById: (id, data) => {
        return mediaModel.findByIdAndUpdate(id, data, { new: true });
    },
    fetchAllMediaData: () => {
        return mediaModel.find().sort({ createdAt: -1 });
    },
    queryMediaData: (findQuery, limit, offset) => {
        return mediaModel.find(findQuery)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({ createdAt: -1 });
    },
    countMediaDocuments: (findQuery) => {
        return mediaModel.countDocuments(findQuery);
    },
    fetchMedia: (id) => {
        return mediaModel.findById(id);
    },
    deleteByType: (id, type) => {
        switch (type) {
            case DELETE_BY_TYPE.PRODUCT:
                return productModel.findByIdAndDelete(id)
            case DELETE_BY_TYPE.SOLUTION:
                return solutionModel.findByIdAndDelete(id)
            case DELETE_BY_TYPE.TESTIMONIAL:
                return testimonialModel.findByIdAndDelete(id)
            case DELETE_BY_TYPE.PROJECT:
                console.log("PROJECT");
                return projectModel.findByIdAndDelete(id)
            case DELETE_BY_TYPE.BLOG:
                return blogModel.findByIdAndDelete(id)
            case DELETE_BY_TYPE.MEDIA:
                return mediaModel.findByIdAndDelete(id)
            default:
                return null
        }
    }
}

