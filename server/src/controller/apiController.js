import httpResponse from '../util/httpResponse.js'
import responseMessage from '../constant/responseMessage.js'
import httpError from '../util/httpError.js'
import quicker from '../util/quicker.js'
import databaseService from '../service/databaseService.js'
import { uploadOnCloudinary } from '../service/cloudinaryService.js'
import { ValidateAddProduct, ValidateAddUtilsData, ValidateBlog, ValidateContactUs, validateJoiSchema, ValidateLogin, ValidateMedia, ValidateProjects, ValidateSoulution, ValidateSupportEnquiry, ValidateTestimonial, ValidateUpdateContactUs, ValidateUpdateProduct, ValidateUpdateProjects, ValidateUpdateSolution, ValidateUpdateSupportEnquiry, ValidateUpdateUtilsData, VlidateDelete } from '../service/validationService.js'
import { allowedUsers, EApplicationEnvironment } from '../constant/application.js'
import config from '../config/config.js'
import { uploadOnImageKit } from '../service/imageKitService.js'

export default {
    self: (req, res, next) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    apiDetailsCheck: (req, res, next) => {
        try {
            const response = quicker.apiDetailsStatus
            httpResponse(req, res, 200, responseMessage.SUCCESS, response)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    health: (req, res, next) => {
        try {
            const healthData = {
                application: quicker.getApplicationHealth(),
                system: quicker.getSystemHealth(),
                timestamp: Date.now()
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, healthData)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    locationStats: async (req, res, next) => {
        try {
            const { lat, long } = req.query;
            const locationDetails = await quicker.getLocationDetails();

            if (!locationDetails) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Location')), req, 400);
            }

            if (lat && long) {
                locationDetails.latitude = lat;
                locationDetails.longitude = long;
            }

            const newLocationStats = await databaseService.savelocationStats(locationDetails);
            if (!newLocationStats) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, newLocationStats);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    getLocationStats: async (req, res, next) => {
        try {
            const locationStats = await databaseService.getLocationStats()
            httpResponse(req, res, 200, responseMessage.SUCCESS, locationStats)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    websiteCount: async (req, res, next) => {
        try {
            const locationStats = await databaseService.getLocationStats()
            httpResponse(req, res, 200, responseMessage.SUCCESS, locationStats.length)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    uploadFile: async (req, res, next) => {
        try {
            const { body } = req

            if (!req.file) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('No file uploaded')), req, 400)
            }

            if (!body.category) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Category is required')), req, 400)
            }

            const uploadedFile = await uploadOnImageKit(req.file.path, body.category)

            if (!uploadedFile) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('File upload failed')), req, 500)
            }

            return httpResponse(req, res, 200, responseMessage.SUCCESS, uploadedFile.url)
        } catch (err) {
            return httpError(next, err, req, 500)
        }
    },
    addProduct: async (req, res, next) => {
        try {
            const { body } = req

            const { value, error } = validateJoiSchema(ValidateAddProduct, body)

            if (error) {
                return httpError(next, error, req, 422)
            }

            const { name, description, slug, bestSuitedFor, categories, subcategories, specification, feature, productImageUrl, applicationImageUrls, brochureUrl, SKUId } = value

            const productData = {
                name,
                description,
                slug,
                bestSuitedFor,
                categories,
                subcategories,
                specification,
                feature,
                productImageUrl,
                brochureUrl,
                productImageUrl,
                applicationImageUrls,
                SKUId
            }

            const savedProduct = await databaseService.saveProduct(productData)

            if (!savedProduct) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }

            httpResponse(req, res, 201, responseMessage.SUCCESS, productData)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    fetchProduct: async (req, res, next) => {
        try {
            const { query = 'all', categories, subcategories, limit = 100, offset = 0 } = req.query

            let findQuery = {}

            switch (query.toLowerCase()) {
                case 'all':
                    break

                case 'active':
                    findQuery.isActive = true
                    break
                case 'inactive':
                    findQuery.isActive = false
                    break

                case 'popular':
                    findQuery = { isEnquired: { $gt: 0 } }
                    break

                case 'required':
                    if (categories) {
                        findQuery.categories = categories
                    }
                    if (subcategories) {
                        findQuery.subcategories = subcategories
                    }
                    break

                default:
                    break
            }

            const products = await databaseService.queryProductData(findQuery, limit, offset)

            const total = await databaseService.countDocuments(findQuery)

            const response = {
                total,
                limit: Number(limit),
                offset: Number(offset),
                products
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, response)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    querySingleProduct: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!id) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('ID')), req, 404)
            }
            const response = await databaseService.queryProductDataById(id)
            if (!response) {
                return httpError(next, new Error(responseMessage.NOT_FOUND), req, 404)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, response)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const { body } = req;
            const { id } = req.params;

            const { value, error } = validateJoiSchema(ValidateUpdateProduct, body);

            if (error) {
                return httpError(next, error, req, 422);
            }

            const updatedProductData = { ...value };

            const updatedProduct = await databaseService.updateProductById(id, updatedProductData);

            if (!updatedProduct) {
                return httpError(next, new Error(responseMessage.NOT_FOUND), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedProduct);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    increaseIsEnquired: async (req, res, next) => {
        try {
            const { id } = req.params

            if (!id) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Requested Product')))
            }

            const response = await databaseService.increaseIsEnquired(id)

            if (!response) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    addUtilsData: async (req, res, next) => {
        try {
            const { body } = req

            const { value, error } = validateJoiSchema(ValidateAddUtilsData, body)

            if (error) {
                return httpError(next, error, req, 422)
            }

            const { title, utilsData } = value
            const newUtilsData = await databaseService.saveUtilsData({
                title,
                utilsData
            })
            if (!newUtilsData) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }

            httpResponse(req, res, 201, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    fetchUtilsData: async (req, res, next) => {
        try {
            const { id } = req.params;
            const utilsData = await databaseService.fetchUtilsData(id);

            if (!utilsData) {
                return httpError(next, new Error(responseMessage.NOT_FOUND("Data")), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, utilsData);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    updateUtilsData: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;

            if (!id) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Document ID is missing')), req, 400);
            }
            const { value, error } = validateJoiSchema(ValidateUpdateUtilsData, body);
            if (error) {
                return httpError(next, error, req, 422);
            }

            const updatedUtilsData = await databaseService.updateUtilsData(id, value);

            if (!updatedUtilsData) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Failed to Update the data')), req, 500);
            }

            httpResponse(req, res, 200, updatedUtilsData);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    removeUtilsData: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!id) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Please provide an ID')), req, 400);
            }

            const deletedUtilsData = await databaseService.removeUtilsData(id);

            if (!deletedUtilsData) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Failed to delete the data')), req, 500);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    fetchUtilsAllData: async (req, res, next) => {
        try {
            const utilsData = await databaseService.fetchAllUtils();

            if (!utilsData) {
                return httpError(next, new Error(responseMessage.NOT_FOUND("Data")), req, 404)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, utilsData)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    saveContactUs: async (req, res, next) => {
        try {
            const { body } = req

            const { value, error } = validateJoiSchema(ValidateContactUs, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            const { name, email, phoneNumber, subject, message, fileLink, companyName } = value

            const newContactUs = await databaseService.saveContactUs({
                name,
                email,
                phoneNumber,
                subject,
                message,
                fileLink,
                companyName
            })

            if (!newContactUs) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    queryContactUsData: async (req, res, next) => {
        try {
            const { limit = 10, offset = 0, subject, isRead, isSpam, isSolved } = req.query;

            const query = {};

            if (subject) {
                query.subject = subject;
            }
            if (isRead !== undefined) {
                query.isRead = isRead === 'true';
            }
            if (isSpam !== undefined) {
                query.isSpam = isSpam === 'true';
            }
            if (isSolved !== undefined) {
                query.isSolved = isSolved === 'true';
            }


            const contactUsList = await databaseService.queryContactUsData(query, limit, offset);

            const total = await databaseService.countContactUsDocuments(query);

            const response = {
                total,
                limit: Number(limit),
                offset: Number(offset),
                contactUsList
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, response)
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    updateContactUsData: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;

            if (!id) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Document ID is missing')), req, 400);
            }

            const { value, error } = validateJoiSchema(ValidateUpdateContactUs, body)

            if (error) {
                return httpError(next, error, req, 422);
            }

            const updatedContactUs = await databaseService.updateContactUsById(id, value)

            if (!updatedContactUs) {
                return httpError(next, new Error(responseMessage.NOT_FOUND("Required Data")), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedContactUs)
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    saveSupportEnquiry: async (req, res, next) => {
        try {
            const { body } = req

            const { value, error } = validateJoiSchema(ValidateSupportEnquiry, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            const { name, email, phoneNumber, subject, message, fileLink, companyName, productName, productSKUId } = value

            const newContactUs = await databaseService.saveSupportEnquiry({
                name,
                email,
                phoneNumber,
                subject,
                message,
                fileLink,
                companyName,
                productName,
                productSKUId
            })

            if (!newContactUs) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    querySupportEnquiryData: async (req, res, next) => {
        try {
            const { limit = 10, offset = 0, subject, isRead, isSpam, isSolved } = req.query;

            const query = {};

            if (isRead !== undefined) {
                query.isRead = isRead === 'true';
            }
            if (isSpam !== undefined) {
                query.isSpam = isSpam === 'true';
            }
            if (isSolved !== undefined) {
                query.isSolved = isSolved === 'true';
            }


            const contactUsList = await databaseService.querySupportEnquiry(query, limit, offset);

            const total = await databaseService.countSupportEnquiryDocuments(query);

            const response = {
                total,
                limit: Number(limit),
                offset: Number(offset),
                contactUsList
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, response)
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    updateSupportEnquiryData: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;

            if (!id) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Document ID is missing')), req, 400);
            }

            const { value, error } = validateJoiSchema(ValidateUpdateSupportEnquiry, body)

            if (error) {
                return httpError(next, error, req, 422);
            }

            const updatedContactUs = await databaseService.updateSupportEnquiryById(id, value)

            if (!updatedContactUs) {
                return httpError(next, new Error(responseMessage.NOT_FOUND("Required Data")), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedContactUs)
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    signIn: (req, res, next) => {
        try {
            const { body } = req;

            const { error, value } = validateJoiSchema(ValidateLogin, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            const { emailAddress, password } = value

            const user = allowedUsers.find(
                (user) => user.email === emailAddress && user.password === password
            );

            if (!user) {
                return httpError(next, new Error(responseMessage.INVALID_CREDENTIALS), req, 401);
            }

            const accessToken = quicker.generateToken(
                {
                    email: user.email
                },
                config.ACCESS_TOKEN.SECRET,
                config.ACCESS_TOKEN.EXPIRY
            )

            const DOMAIN = quicker.getDomainFromUrl(config.SERVER_URL)

            res.cookie('accessToken', accessToken, {
                path: '/api/v1',
                domain: DOMAIN,
                sameSite: 'strict',
                maxAge: 1000 * config.ACCESS_TOKEN.EXPIRY,
                httpOnly: true,
                secure: !(config.ENV === EApplicationEnvironment.DEVELOPMENT)
            })

            httpResponse(req, res, 200, responseMessage.SUCCESS, { accessToken })
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    selfIdentification: (req, res, next) => {
        try {
            const { authenticatedUser } = req
            httpResponse(req, res, 200, responseMessage.SUCCESS, authenticatedUser)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    saveSolutions: async (req, res, next) => {
        try {
            const { body } = req

            const { error, value } = validateJoiSchema(ValidateSoulution, body)

            if (error) {
                return httpError(next, error, req, 422)
            }

            const newSolution = await databaseService.saveSolutionData(value)

            if (!newSolution) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }
            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    querySolutions: async (req, res, next) => {
        try {
            const solutionsList = await databaseService.queryAllSolutions();

            if (!solutionsList) {
                return httpError(next, new Error(responseMessage.NOT_FOUND("Data")), req, 404)
            }
            const response = []
            solutionsList.forEach(element => {
                response.push({
                    _id: element._id,
                    subcategories: element.subcategories,
                    thumbnail: element.thumbnail,
                    description: element.description

                })
            });
            httpResponse(req, res, 200, responseMessage.SUCCESS, response)
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    querySolution: async (req, res, next) => {
        try {
            const { id } = req.params;

            const solutionsList = await databaseService.querySolutionById(id);

            if (!solutionsList) {
                return httpError(next, new Error(responseMessage.NOT_FOUND("Data")), req, 404)
            }
            httpResponse(req, res, 200, responseMessage.SUCCESS, solutionsList)
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    updateSolutions: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;

            const { error, value } = validateJoiSchema(ValidateUpdateSolution, body)

            if (error) {
                return httpError(next, error, req, 422);
            }

            const updatedSolution = await databaseService.updateSolutionData(id, value);

            if (!updatedSolution) {
                return httpError(next, new Error(responseMessage.FAILED_TO_UPDATE), req, 500);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    saveTestimonial: async (req, res, next) => {
        try {
            const { body } = req

            const { error, value } = validateJoiSchema(ValidateTestimonial, body)

            if (error) {
                return httpError(next, error, req, 422)
            }

            const newTestimonial = await databaseService.saveTestimonialData(value)

            if (!newTestimonial) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    queryTestimonials: async (req, res, next) => {
        try {
            const testimonialsList = await databaseService.queryAllTestimonials();



            if (!testimonialsList) {
                return httpError(next, new Error(responseMessage.NOT_FOUND("Data")), req, 404)
            }
            httpResponse(req, res, 200, responseMessage.SUCCESS, testimonialsList)
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    updateTestimonials: async (req, res, next) => {
        try {
            const { id } = req.params;

            const updatedTestimonial = await databaseService.updateTestimonialData(id);

            if (!updatedTestimonial) {
                return httpError(next, new Error(responseMessage.NOT_FOUND("Data")), req, 404)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    updateTestiminialData: async (req, res, next) => {
        try {
            const { id } = req.params;

            const { body } = req;

            const { error, value } = validateJoiSchema(ValidateTestimonial, body);

            if (error) {
                return httpError(next, error, req, 422);
            }

            const updatedTestimonial = await databaseService.updateSingleTestimonialData(id, value);
            if (!updatedTestimonial) {
                return httpError(next, new Error(responseMessage.NOT_FOUND("Data")), req, 500);
            }

            // Send a success response
            httpResponse(req, res, 200, responseMessage.SUCCESS);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    saveProjects: async (req, res, next) => {
        try {
            const { body } = req

            const { error, value } = validateJoiSchema(ValidateProjects, body)

            if (error) {
                return httpError(next, error, req, 422)
            }

            const newProject = await databaseService.saveProjectData(value)

            if (!newProject) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    queryProjects: async (req, res, next) => {
        try {
            const projectsList = await databaseService.queryAllProjects();

            if (!projectsList) {
                return httpError(next, new Error(responseMessage.NOT_FOUND("Data")), req, 404)
            }
            httpResponse(req, res, 200, responseMessage.SUCCESS, projectsList)
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    updateProject: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;

            const { error, value } = validateJoiSchema(ValidateUpdateProjects, body);

            if (error) {
                return httpError(next, error, req, 422);
            }

            const updatedProject = await databaseService.updateProjectData(id, value);

            if (!updatedProject) {
                return httpError(next, new Error(responseMessage.SOMETHING_WENT_WRONG), req, 500);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedProject);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    createBlog: async (req, res, next) => {
        try {
            const { body } = req

            const { value, error } = validateJoiSchema(ValidateBlog, body)

            if (error) {
                return httpError(next, error, req, 422)
            }

            const { title, description, tag, thumbnailImage, userImage, userName, content, resource_type
                , slug } = value

            const blogData = {
                title, description, tag, thumbnailImage, userImage, userName, content, resource_type
                , slug
            }

            const saveBlogData = await databaseService.saveBlog(blogData)

            if (!saveBlogData) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500)
            }



            httpResponse(req, res, 201, responseMessage.SUCCESS, blogData)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    updateBlog: async (req, res, next) => {
        try {
            const { body } = req;
            const { id } = req.params;

            const { value, error } = validateJoiSchema(ValidateBlog, body);

            if (error) {
                return httpError(next, error, req, 422);
            }

            const updatedBlogData = { ...value };

            const updatedBlog = await databaseService.updateBlogById(id, updatedBlogData);

            if (!updatedBlog) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Blog')), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedBlog);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    fetchBlogs: async (req, res, next) => {
        try {
            const { query = 'all', limit = 100, offset = 0 } = req.query

            let findQuery = {}

            switch (query.toLowerCase()) {
                case 'all':
                    break
                default:
                    break
            }
            const blogs = await databaseService.fetchAllBlogData()
            console.log(blogs);


            const total = await databaseService.countBlogDocuments(findQuery)

            const response = {
                total,
                limit: Number(limit),
                offset: Number(offset),
                blogs
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, response)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    fetchSigleBlog: async (req, res, next) => {
        try {
            const { id } = req.params


            const blogs = await databaseService.fetchBlog(id)

            if (!blogs) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Blog')), req, 404)
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, blogs)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },

    createMedia: async (req, res, next) => {
        try {
            const { body } = req;

            const { value, error } = validateJoiSchema(ValidateMedia, body);

            if (error) {
                return httpError(next, error, req, 422);
            }

            const { title, resource_type, slug, description, thumbnailImage, link } = value;

            const mediaData = {
                title,
                resource_type,
                slug,
                description,
                thumbnailImage,
                link
            };

            const saveMediaData = await databaseService.saveMedia(mediaData);

            if (!saveMediaData) {
                return httpError(next, new Error(responseMessage.FAILED_TO_SAVE), req, 500);
            }

            httpResponse(req, res, 201, responseMessage.SUCCESS, mediaData);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    updateMedia: async (req, res, next) => {
        try {
            const { body } = req;
            const { id } = req.params;

            const { value, error } = validateJoiSchema(ValidateMedia, body);

            if (error) {
                return httpError(next, error, req, 422);
            }

            const updatedMediaData = { ...value };

            const updatedMedia = await databaseService.updateMediaById(id, updatedMediaData);

            if (!updatedMedia) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Media')), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedMedia);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    fetchMediaItems: async (req, res, next) => {
        try {
            const { query = 'all', limit = 100, offset = 0 } = req.query;

            let findQuery = {};

            switch (query.toLowerCase()) {
                case 'all':
                    break;
                default:
                    break;
            }

            const mediaItems = await databaseService.queryMediaData(findQuery, limit, offset);
            const total = await databaseService.countMediaDocuments(findQuery);

            const response = {
                total,
                limit: Number(limit),
                offset: Number(offset),
                media: mediaItems
            };

            httpResponse(req, res, 200, responseMessage.SUCCESS, response);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    fetchSingleMedia: async (req, res, next) => {
        try {
            const { id } = req.params;

            const media = await databaseService.fetchMedia(id);

            if (!media) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Media')), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, media);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    deleteDataByType: async (req, res, next) => {
        try {
            const { body } = req;


            const { value, error } = validateJoiSchema(VlidateDelete, body);

            if (error) {
                return httpError(next, error, req, 422);
            }

            const { _id, type } = value;

            const deletedData = await databaseService.deleteByType(_id, type);

            if (!deletedData) {
                return httpError(next, new Error(responseMessage.NOT_FOUND(type)), req, 404)
            }


            httpResponse(req, res, 200, responseMessage.SUCCESS, deletedData);

        } catch (err) {
            httpError(next, err, req, 500);
        }
    }
}

