import { useState, useEffect } from 'react'
import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import PropTypes from 'prop-types'
import { uploadFile, saveProject, updateProject } from '../../service/apiService'
import { toast } from 'react-hot-toast'

const ProjectModel = ({ open, onClose, token, existingProject }) => {
    const initialFormState = {
        categories: '',
        projects: [
            {
                title: '',
                place: '',
                imageUrl: null,
                isPublished: true
            }
        ]
    }

    const [formData, setFormData] = useState(initialFormState)
    const [loading, setLoading] = useState(false)
    const [uploadsComplete, setUploadsComplete] = useState({})

    // Update form data when existing project changes
    useEffect(() => {
        if (existingProject && open) {
            setFormData({
                categories: existingProject.categories,
                projects: existingProject.projects.map(project => ({
                    ...project,
                    // Ensure _id is preserved
                    _id: project._id || undefined
                }))
            })
            // Reset upload tracking
            const uploadStatus = existingProject.projects.reduce((acc, _, index) => {
                acc[`project${index}`] = true
                return acc
            }, {})
            setUploadsComplete(uploadStatus)
        } else if (!open) {
            // Reset form when modal closes
            setFormData(initialFormState)
            setUploadsComplete({})
        }
    }, [existingProject, open])

    const handleInputChange = (e, index) => {
        const { name, value } = e.target
        const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()

        setFormData((prev) => {
            const updatedProjects = [...prev.projects]
            updatedProjects[index] = {
                ...updatedProjects[index],
                [name]: formattedValue
            }
            return { ...prev, projects: updatedProjects }
        })
    }

    const addProject = () => {
        setFormData((prev) => ({
            ...prev,
            projects: [
                ...prev.projects,
                {
                    title: '',
                    place: '',
                    imageUrl: null,
                    isPublished: true
                }
            ]
        }))
    }

    const removeProject = (index) => {
        setFormData((prev) => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index)
        }))
        setUploadsComplete((prev) => {
            const newUploads = { ...prev }
            delete newUploads[`project${index}`]
            return newUploads
        })
    }

    const handleFileUpload = async (e, index) => {
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
            uploadData.append('category', 'PROJECT_IMAGE')

            const response = await uploadFile(uploadData)
            if (response.success) {
                setFormData((prev) => {
                    const updatedProjects = [...prev.projects]
                    updatedProjects[index] = {
                        ...updatedProjects[index],
                        imageUrl: response.data
                    }
                    return { ...prev, projects: updatedProjects }
                })
                setUploadsComplete((prev) => ({ ...prev, [`project${index}`]: true }))
                toast.success('File uploaded successfully')
            } else {
                toast.error('File upload failed')
            }
        } catch (error) {
            console.error('Upload failed:', error)
            toast.error('An error occurred during file upload')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const allUploadsComplete = formData.projects.every((_, index) => uploadsComplete[`project${index}`])
        if (!allUploadsComplete) {
            toast.error('Please upload images for all projects before submitting')
            return
        }
    
        setLoading(true)
        try {
            let response
            if (existingProject) {
                // Modify the payload to handle new projects
                const updatedPayload = {
                    ...formData,
                    projects: formData.projects.map(project => 
                        project._id ? project : { ...project, _id: undefined }
                    )
                }
                response = await updateProject(existingProject._id, updatedPayload)
            } else {
                response = await saveProject(token, formData)
            }
    
            if (response.success) {
                toast.success(existingProject ? 'Project updated successfully' : 'Projects saved successfully')
                onClose()
            } else {
                toast.error('Projects save failed')
            }
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
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                    {existingProject ? 'Edit Projects' : 'Add New Projects'}
                </h2>
                <p className="text-sm text-gray-500 mb-4">Note: Sentence case is allowed for input fields</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            name="categories"
                            value={formData.categories}
                            onChange={(e) => setFormData((prev) => ({ 
                                ...prev, 
                                categories: e.target.value 
                            }))}
                            placeholder="Enter category"
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-800">Projects</h3>
                            <button
                                type="button"
                                onClick={addProject}
                                className="flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-700">
                                <AddCircleOutlineIcon className="mr-1" />
                                Add Project
                            </button>
                        </div>

                        {formData.projects.map((project, index) => (
                            <div
                                key={project._id || index}
                                className="p-4 rounded-lg border border-gray-200 relative">
                                {formData.projects.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeProject(index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                        <DeleteOutlineIcon />
                                    </button>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Project Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={project.title}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Place</label>
                                        <input
                                            type="text"
                                            name="place"
                                            value={project.place}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Publish Status</label>
                                        <select
                                            name="isPublished"
                                            value={project.isPublished}
                                            onChange={(e) => {
                                                const value = e.target.value === 'true'
                                                setFormData((prev) => {
                                                    const updatedProjects = [...prev.projects]
                                                    updatedProjects[index] = {
                                                        ...updatedProjects[index],
                                                        isPublished: value
                                                    }
                                                    return { ...prev, projects: updatedProjects }
                                                })
                                            }}
                                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2"
                                        >
                                            <option value="true">Published</option>
                                            <option value="false">Unpublished</option>
                                        </select>
                                    </div>

                                    <FileUpload
                                        label="Upload Project Image"
                                        file={project.imageUrl}
                                        onUpload={(e) => handleFileUpload(e, index)}
                                    />
                                </div>
                            </div>
                        ))}
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
                            {loading ? 'Saving...' : (existingProject ? 'Update Projects' : 'Save Projects')}
                        </button>
                    </div>
                </form>
            </motion.div>
        </Modal>
    )
}

const FileUpload = ({ label, file, onUpload }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
        <label className="cursor-pointer block">
            <CloudUploadIcon className="text-gray-400 text-3xl mb-2" />
            <span className="block text-sm font-medium text-gray-700">{label}</span>
            <input
                type="file"
                onChange={onUpload}
                accept="image/*"
                className="hidden"
            />
            {file && (
                <div className="mt-2">
                    <p className="text-sm text-green-600">File uploaded</p>
                    <img
                        src={file}
                        alt="Preview"
                        className="mt-2 max-h-20 mx-auto"
                    />
                </div>
            )}
        </label>
    </div>
)

ProjectModel.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    existingProject: PropTypes.object
}

FileUpload.propTypes = {
    label: PropTypes.string.isRequired,
    file: PropTypes.string,
    onUpload: PropTypes.func.isRequired
}

export default ProjectModel