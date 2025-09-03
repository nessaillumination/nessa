import { Modal } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const TestimonialDetailsModal = ({ open, onClose, testimonial }) => {
    if (!testimonial) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0, 0, 0, 0.7)',
            }}
        >
            <motion.div
                className="bg-white p-8 rounded-xl shadow-2xl w-[800px] max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            >
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-semibold text-gray-800">{testimonial.name}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Testimonial Image */}
                    <div className="flex justify-center">
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="h-60 w-full object-cover   "
                        />
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold">Company</h3>
                            <p>{testimonial.company}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Published Status</h3>
                            <p className={`text-lg ${testimonial.isPublished ? 'text-green-500' : 'text-red-500'}`}>
                                {testimonial.isPublished ? 'Published' : 'Unpublished'}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="font-semibold">Testimonial Description</h3>
                        <p className="text-gray-700">{testimonial.description || 'No description available'}</p>
                    </div>

                    {/* Additional Details (timestamps) */}
                    <div>
                        <h3 className="font-semibold">Created At</h3>
                        <p className="text-gray-600">{new Date(testimonial.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Updated At</h3>
                        <p className="text-gray-600">{new Date(testimonial.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </motion.div>
        </Modal>
    );
};

TestimonialDetailsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    testimonial: PropTypes.object,
};

export default TestimonialDetailsModal;
