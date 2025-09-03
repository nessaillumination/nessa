import { servicesAxiosInstance } from './config'

export const getServerHealth = async () => {
    const response = await servicesAxiosInstance.get('/v1/health')
    return response.data
}

export const saveVisitorLocation = async (locationData = {}) => {
    const { latitude, longitude } = locationData

    const params = latitude && longitude ? { lat: latitude, long: longitude } : {}

    const response = await servicesAxiosInstance.get('/v1/save-location-stats', { params })
    return response.data
}

export const fetchVisitorLocation = async () => {
    const response = await servicesAxiosInstance.get('/v1/fetch-location-stats')
    return response.data
}

export const apiDetailsStatus = async () => {
    const response = await servicesAxiosInstance('/v1/api-details-check')
    return response.data
}

export const uploadFile = async (file) => {
    const response = await servicesAxiosInstance.post('/v1/upload-file', file)
    return response.data
}

export const saveContactUs = async (contactData) => {
    const response = await servicesAxiosInstance.post('/v1/save-contact-us-data', contactData)
    return response.data
}

export const saveSupportEnquiry = async (supportData) => {
    const response = await servicesAxiosInstance.post('/v1/save-support-enquiry', supportData)
    return response.data
}

export const fetchProducts = async (params) => {
    const response = await servicesAxiosInstance.get('/v1/query-product-data', { params })
    return response.data
}

export const increaseIsEnquired = async (e) => {
    const response = await servicesAxiosInstance.get(`/v1/increase-enquired/${e}`)
    return response.data
}

export const fetchProduct = async (id) => {
    const response = await servicesAxiosInstance.get(`/v1/query-product/${id}`)
    return response.data
}

export const allSolutions = async () => {
    const response = await servicesAxiosInstance.get('/v1/query-solutions')
    return response.data
}

export const solutionData = async (id) => {
    const response = await servicesAxiosInstance.get(`/v1/query-solution/${id}`)
    return response.data
}

export const queryTestimonial = async () => {
    const response = await servicesAxiosInstance.get('/v1/query-testimonials')
    return response.data
}

export const fetchUtilsData = async (id) => {
    const response = await servicesAxiosInstance.get(`/v1/fetch-utils-data/${id}`)
    return response.data
}

export const fetchProjectsData = async () => {
    const response = await servicesAxiosInstance.get(`/v1/query-projects`)
    return response.data
}

export const fetchBlogs = async () => {
    const response = await servicesAxiosInstance.get(`/v1/query-blog-data?query=all&limit=100&offset=0`)
    return response.data
}

export const fetchOneBlog = async (id) => {
    const response = await servicesAxiosInstance.get(`/v1/query-blog/${id}`)
    return response.data
}

export const fetchMediaItems = async () => {
    const response = await servicesAxiosInstance.get('/v1/query-media-data')
    return response.data
}

export const fetchSingleMedia = async (id) => {
    const response = await servicesAxiosInstance.get(`/v1/query-media/${id}`)
    return response.data
}