import { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import PropTypes from 'prop-types'
import { uploadFile } from '../../service/apiService'
import { toast } from 'react-hot-toast'

const TestimonialModel = ({ open, onClose, token, onSubmit ,isEditMode, testimonialData}) => {
    console.log(isEditMode,testimonialData);
    
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        description: '',
        image: null,
        isPublished: false
    })

    const [loading, setLoading] = useState(false)
    const [uploadComplete, setUploadComplete] = useState(false)

    useEffect(() => {
        if (isEditMode && testimonialData) {
            setFormData({
                name: testimonialData.name,
                company: testimonialData.company,
                description: testimonialData.description,
                image: testimonialData.image,
                isPublished: testimonialData.isPublished
            });
        }else{
            setFormData({
                name: '',
                company: '',
                description: '',
                image: null,
                isPublished: false
            })
        }
    }, [isEditMode, testimonialData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (file.size > 1000000) {
            toast.error('File size must be less than 1MB')
            e.target.value = null
            return
        }

        setLoading(true)
        try {
            const uploadData = new FormData()
            uploadData.append('file', file)
            uploadData.append('category', 'TESTIMONIAL_IMAGE')

            const response = await uploadFile(uploadData)
            if (response.success) {
                setFormData(prev => ({
                    ...prev,
                    image: response.data
                }))
                setUploadComplete(true)
                toast.success('Image uploaded successfully')
            } else {
                toast.error('Image upload failed')
            }
        } catch (error) {
            console.error('Upload failed:', error)
            toast.error('An error occurred during image upload')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!uploadComplete&&!formData.image) {
            toast.error('Please upload an image before submitting')
            return
        }

        setLoading(true)
        try {
            // Create submission data without isPublished if it's false
            const submissionData = {
                name: formData.name,
                company: formData.company,
                description: formData.description,
                image: formData.image,
                ...(formData.isPublished && { isPublished: true })
            }

            await onSubmit(submissionData, token)
            toast.success('Testimonial saved successfully')
            onClose()
        } catch (error) {
            console.error('Submission failed:', error)
            toast.error('An error occurred during submission')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0, 0, 0, 0.7)'
            }}>
            <motion.div
                className="bg-white p-8 rounded-xl shadow-2xl w-[600px] max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 500 }}>
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">{isEditMode ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Company */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Published Toggle */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isPublished"
                            checked={formData.isPublished}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                            Publish this testimonial
                        </label>
                    </div>

                    {/* Image Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                        <label className="cursor-pointer block">
                            <CloudUploadIcon className="text-gray-400 text-3xl mb-2" />
                            <span className="block text-sm font-medium text-gray-700">Upload Image</span>
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                accept="image/*"
                                className="hidden"
                            />
                            {formData.image && (
                                <div className="mt-2">
                                    <p className="text-sm text-green-600">Image uploaded</p>
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="mt-2 max-h-20 mx-auto"
                                    />
                                </div>
                            )}
                        </label>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-5 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:opacity-90 transition-opacity ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={loading}>
                            {loading ? 'Saving...' : 'Save Testimonial'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </Modal>
    )
}

TestimonialModel.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default TestimonialModel