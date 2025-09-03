import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import { querySingleSolutions } from '../../service/apiService';
const SolutionDetailsModal = ({ open, onClose, solutionId }) => {
    const [solution, setSolution] = useState(null);
    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
        if (!solutionId) return;

        const fetchSolution = async () => {
            setLoading(true);
            try {
                const fetchedSolution = await querySingleSolutions(solutionId); 
                
                setSolution(fetchedSolution.data);
            } catch (error) {
                console.error('Error fetching solution details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSolution();
    }, [solutionId]); 

    if (loading) {
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
                <div className="flex justify-center items-center">
                    <CircularProgress />
                </div>
            </Modal>
        );
    }

    if (!solution) return null;
    

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
                        <h2 className="text-3xl font-semibold text-gray-800">{solution.title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>

                    {/* Solution Thumbnail */}
                    <img
                        src={solution.thumbnail}
                        alt={solution.title}
                        className="w-full h-64 object-cover rounded-lg"
                    />

                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold">Category</h3>
                            <p>{solution.categories}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Subcategory</h3>
                            <p>{solution.subcategories}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="font-semibold">Solution Description</h3>
                        <p className="text-gray-700">{solution.description || 'No description available'}</p>
                    </div>

                    {/* Related Products */}
                    {solution.relatedProduct && solution.relatedProduct.length > 0 && (
                        <div>
                            <h3 className="font-semibold">Related Products</h3>
                            <div className="space-y-4">
                                {solution.relatedProduct.map((related, index) => (
                                    <div key={index}>
                                        <h4 className="font-medium">{related.title}</h4>
                                        <p className="text-gray-700">{related.application || 'No application details'}</p>
                                        <div className="space-y-2 mt-2">
                                            {related.products.map((product, idx) => (
                                                <div key={idx} className="bg-gray-50 p-4 rounded">
                                                    <p><strong>{product.name}</strong></p>
                                                    <p>{product.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Solution Image */}
                    <div>
                        <h3 className="font-semibold">Solution Image</h3>
                        <img
                            src={solution.solutionImageUrl}
                            alt={`${solution.title} image`}
                            className="mx-auto w-[300px] h-auto object-cover rounded-lg border-2 "
                        />
                    </div>
                </div>
            </motion.div>
        </Modal>
    );
};

SolutionDetailsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    solutionId: PropTypes.string.isRequired,
};

export default SolutionDetailsModal;
