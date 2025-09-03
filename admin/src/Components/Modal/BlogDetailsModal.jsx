import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const BlogDetailsModal = ({ open, onClose, blog }) => {
    if (!blog) return null

   
    

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
                        <h2 className="text-3xl font-semibold text-gray-800">{blog.title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>

                    <img
                        src={blog.thumbnailImage}
                        alt={blog.title}
                        className="w-full h-64 object-cover rounded-lg"
                    />

                    <div className="flex items-center gap-4">
                        <img
                            src={blog.userImage}
                            alt={blog.userName}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="font-medium">{blog.userName}</h3>
                        </div>
                    </div>

                    <div>
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                            {blog.tag}
                        </span>
                        
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Resource Type</h3>
                        <p className="text-blue-700 font-bold">{blog?.resource_type?.replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p className="text-gray-700">{blog.description}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Content</h3>
                        <div className="prose max-w-none"  dangerouslySetInnerHTML={{ __html: blog?.content }}>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Modal>
    )
}

BlogDetailsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    blog: PropTypes.object
}

export default BlogDetailsModal