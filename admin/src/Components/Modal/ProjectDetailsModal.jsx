import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const ProjectDetailsModal = ({ open, onClose, project, category }) => {
    if (!project) return null

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
                className="bg-white p-8 rounded-xl shadow-2xl w-[800px] max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 500 }}>
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-semibold text-gray-800">{project.title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Project Image */}
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-64 object-cover rounded-lg"
                    />

                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold">Category</h3>
                            <p>{category}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Location</h3>
                            <p>{project.place}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="font-semibold">Project Description</h3>
                        <p className="text-gray-700">{project.description || 'No description available'}</p>
                    </div>

                    {/* Additional Details (if available) */}
                    {project.additionalDetails && (
                        <div>
                            <h3 className="font-semibold">Additional Details</h3>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                {Object.entries(project.additionalDetails).map(([key, value]) => (
                                    <div key={key} className="bg-gray-50 p-2 rounded">
                                        <span className="font-medium">{key}:</span> {value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </Modal>
    )
}

ProjectDetailsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    project: PropTypes.object,
    category: PropTypes.string
}

export default ProjectDetailsModal