import { Router } from 'express'
import apiController from '../controller/apiController.js'
import { uploadFiles } from '../middleware/multerHandler.js'
import authentication from '../middleware/authentication.js'
import authorization from '../middleware/authorization.js'

const router = Router()

router.route('/self').get(apiController.self)
router.route('/health').get(apiController.health)
router.route('/api-details-check').get(apiController.apiDetailsCheck)
router.route('/save-location-stats').get(apiController.locationStats)
router.route('/fetch-location-stats').get(apiController.getLocationStats)
router.route('/website-count').get(apiController.websiteCount)
router.route('/upload-file').post(uploadFiles, apiController.uploadFile);
// router.route('/add-product').post(authentication,authorization() ,apiController.addProduct);
router.route('/add-product').post(apiController.addProduct);
router.route('/query-product-data').get(apiController.fetchProduct);
router.route('/query-product/:id').get(apiController.querySingleProduct)
router.route('/update-product/:id').post(authentication, authorization(), apiController.updateProduct);
router.route('/increase-enquired/:id').get(apiController.increaseIsEnquired)
router.route('/save-utils-data').post(apiController.addUtilsData)
router.route('/fetch-utils-data/:id').get(apiController.fetchUtilsData)
router.route('/fetch-all-utils').get(apiController.fetchUtilsAllData)
router.route('/update-utils-data/:id').post(apiController.updateUtilsData)
router.route('/remove-utils-data/:id').delete(apiController.removeUtilsData)
router.route('/save-contact-us-data').post(apiController.saveContactUs)
router.route('/query-contact-us-data').get(authentication, authorization(), apiController.queryContactUsData)
router.route('/update-contact-us-data/:id').post(authentication, authorization(), apiController.updateContactUsData)
router.route('/save-support-enquiry').post(apiController.saveSupportEnquiry)
router.route('/query-support-enquiry-data').get(authentication, authorization(), apiController.querySupportEnquiryData)
router.route('/update-support-enquiry-data/:id').post(authentication, authorization(), apiController.updateSupportEnquiryData)
router.route('/sign-in').post(apiController.signIn)
router.route('/self-identification').get(authentication, apiController.selfIdentification)
router.route('/save-solution').post(apiController.saveSolutions)
router.route('/query-solutions').get(apiController.querySolutions)
router.route('/query-solution/:id').get(apiController.querySolution)
router.route('/update-solution/:id').post(apiController.updateSolutions)
router.route('/add-testimonial').post(authentication, authorization(), apiController.saveTestimonial)
router.route('/query-testimonials').get(apiController.queryTestimonials)
router.route('/update-testimonial/:id').get(authentication, authorization(), apiController.updateTestimonials)
router.route('/update-testimonial-data/:id').put(authentication, authorization(), apiController.updateTestiminialData)
router.route('/save-projects').post(apiController.saveProjects)
router.route('/query-projects').get(apiController.queryProjects)
router.route('/update-project/:id').post(apiController.updateProject)
router.route('/create-blog').post(authentication, authorization(), apiController.createBlog);
router.route('/update-blog/:id').put(authentication, authorization(), apiController.updateBlog);
router.route('/query-blog-data').get(apiController.fetchBlogs)
router.route('/query-blog/:id').get(apiController.fetchSigleBlog)

router.route('/create-media').post(authentication, authorization(), apiController.createMedia);
router.route('/update-media/:id').put(authentication, authorization(), apiController.updateMedia);
router.route('/query-media-data').get(apiController.fetchMediaItems);
router.route('/query-media/:id').get(apiController.fetchSingleMedia);

router.route('/delete-by-type').delete(apiController.deleteDataByType)

export default router