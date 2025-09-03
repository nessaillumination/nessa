import { Modal } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const MediaDetailsModal = ({ open, onClose, media }) => {
    if (!media) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0, 0, 0, 0.7)'
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
                        <h2 className="text-3xl font-semibold text-gray-800">{media.title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <img
                        src={media.thumbnailImage}
                        alt={media.title}
                        className="w-full h-64 object-cover rounded-lg"
                    />

                    <div>
                        <h3 className="font-semibold mb-2">Resource Type</h3>
                        <p className="text-blue-700 font-bold">
                            {media?.resource_type?.replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p className="text-gray-700">{media.description}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Link</h3>
                        <a
                            href={media.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            {media.link}
                        </a>
                    </div>
                </div>
            </motion.div>
        </Modal>
    );
};

MediaDetailsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    media: PropTypes.object
};

export default MediaDetailsModal;