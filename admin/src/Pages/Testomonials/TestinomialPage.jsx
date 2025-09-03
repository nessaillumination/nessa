import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import TestimonialModel from '../../Components/Modal/TestimonialModel';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/utils';
import toast from 'react-hot-toast';
import Pagination from '@mui/material/Pagination';
import { CircularProgress, Switch } from '@mui/material';
import { queryTestimonials, saveTestimonials, updateTestimonialData, updateTestimonialStatus } from '../../service/apiService';
import TestimonialDetailsModal from '../../Components/Modal/TestimonialDetailsModal';
import { DeleteModalButton, DELETEMODELBYTYPE } from '../../Components/DeleteModal';

const TestimonialPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [toggleLoading, setToggleLoading] = useState('');
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);


    const handleOpenModal = (testimonial = null) => {
        if (testimonial) {
            setSelectedTestimonial(testimonial);
            setIsEditMode(true); // Set to edit mode
        } else {
            setIsEditMode(false); 
            setSelectedTestimonial(null);
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedTestimonial(null);
        setIsEditMode(false)
    };

    const handleOpenDetailsModal = (testimonial) => {
        setSelectedTestimonial(testimonial);
        setOpenDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setSelectedTestimonial(null);
        setOpenDetailsModal(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token || isTokenExpired(token)) {
            navigate('/');
        }
    }, [navigate]);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const response = await queryTestimonials();
            if (response.data) {
                setTestimonials(response.data);
            } else {
                toast.error('Failed to fetch testimonials');
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            toast.error('An error occurred while fetching testimonials');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleTogglePublish = async (id, currentStatus) => {
        setToggleLoading(id);
        try {
            const token = localStorage.getItem('accessToken');
            const response = await updateTestimonialStatus(id, token);
            if (response.success) {
                setTestimonials(prev =>
                    prev.map(testimonial =>
                        testimonial._id === id
                            ? { ...testimonial, isPublished: !currentStatus }
                            : testimonial
                    )
                );
                toast.success(`Testimonial ${!currentStatus ? 'published' : 'unpublished'} successfully`);
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('An error occurred while updating status');
        } finally {
            setToggleLoading('');
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTestimonials = testimonials.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleTestimonialSubmit = async (data, token) => {
        try {
            let response;
            if (isEditMode) {
                response = await updateTestimonialData(selectedTestimonial._id, data, token);
            } else {
                response = await saveTestimonials(token, data);
            }

            if (response.success) {
                toast.success('Testimonial ' + (isEditMode ? 'updated' : 'submitted') + ' successfully');
                handleCloseModal();
                await fetchTestimonials();
            } else {
                toast.error('Failed to ' + (isEditMode ? 'update' : 'submit') + ' testimonial');
            }
        } catch (error) {
            console.error('Error submitting testimonial:', error);
            throw error;
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">Testimonials</h1>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-6">
                    {currentTestimonials.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"

                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-40 w-full object-cover"
                            />
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                    <Switch
                                        checked={item.isPublished}
                                        onChange={() => handleTogglePublish(item._id, item.isPublished)}
                                        disabled={toggleLoading === item._id}
                                        color="primary"
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{item.company}</p>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                            <div className="mt-4 flex gap-2 flex-wrap my-2 mx-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleOpenDetailsModal(item)}>
                                    View Details
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleOpenModal(item)}                                    >
                                    Edit
                                </button>
                                <DeleteModalButton id={item?._id} type={DELETEMODELBYTYPE.TESTIMONIAL} fetchData={fetchTestimonials}></DeleteModalButton>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-8">
                <Pagination
                    count={Math.ceil(testimonials.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>

            <motion.button
                className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-blue-600 text-white rounded-full p-3 sm:p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={()=>{
                    handleOpenModal()
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <AddIcon />
            </motion.button>

            <TestimonialModel
                open={openModal}
                onClose={handleCloseModal}
                token={localStorage.getItem('accessToken')}
                onSubmit={handleTestimonialSubmit}
                isEditMode={isEditMode}
                testimonialData={selectedTestimonial}
            />

            {/* TestimonialDetailsModal */}
            <TestimonialDetailsModal
                open={openDetailsModal}
                onClose={handleCloseDetailsModal}
                testimonial={selectedTestimonial}
            />
        </div>
    );
};

export default TestimonialPage;
