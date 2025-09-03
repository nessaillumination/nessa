import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import SolutionsModel from '../../Components/Modal/SolutionsModel';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/utils';
import { querySolutions } from '../../service/apiService';
import toast from 'react-hot-toast';
import Pagination from '@mui/material/Pagination';
import { CircularProgress } from '@mui/material';
import SolutionDetailsModal from '../../Components/Modal/SolutionDetailsModal';
import { DeleteModalButton, DELETEMODELBYTYPE } from '../../Components/DeleteModal';
import UpdateSolutionModel from '../../Components/Modal/UpdateSolutionModel';

const SolutionPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [solutions, setSolutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [selectedSolution, setSelectedSolution] = useState(null);
    const navigate = useNavigate();

    const [openEditModal, setOpenEditModal] = useState(false); 
    const [editSolutionId, setEditSolutionId] = useState(null);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleOpenDetailsModal = (solution) => {
        setSelectedSolution(solution); 
    };

    const handleCloseDetailsModal = () => {
        setSelectedSolution(null); 
    };

    const handleOpenEditModal = (solutionId) => {
        setEditSolutionId(solutionId);  
        setOpenEditModal(true); 
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false); 
        setEditSolutionId(null); 
        fetchSolutions();
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token || isTokenExpired(token)) {
            navigate('/');
        }
    }, [navigate]);
    const fetchSolutions = async () => {
        setLoading(true);
        try {
            const response = await querySolutions();
            if (response.data) {
                setSolutions(response.data);
            } else {
                toast.error('Failed to fetch solutions');
            }
        } catch (error) {
            console.error('Error fetching solutions:', error);
            toast.error('An error occurred while fetching solutions');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchSolutions();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSolutions = solutions.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">Solutions</h1>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-6">
                    {currentSolutions.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.subcategories}
                                className="h-40 w-full object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg sm:text-xl font-medium text-gray-900">{item.subcategories}</h3>
                            </div>
                            <div className="mx-2 my-2 flex gap-2 flex-wrap">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleOpenDetailsModal(item)} 
                                >
                                    View Details
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleOpenEditModal(item._id)}
                                >
                                    Edit
                                </button>
                                <DeleteModalButton id={item._id} type={DELETEMODELBYTYPE.SOLUTION} fetchData={fetchSolutions} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-8">
                <Pagination
                    count={Math.ceil(solutions.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>

            <motion.button
                className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-blue-600 text-white rounded-full p-3 sm:p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleOpenModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <AddIcon />
            </motion.button>

            <SolutionsModel
                open={openModal}
                onClose={handleCloseModal}
                token={localStorage.getItem('accessToken')}
            />

            {/* Solution Details Modal */}
            <SolutionDetailsModal
                open={Boolean(selectedSolution)} 
                onClose={handleCloseDetailsModal}
                solutionId={selectedSolution?._id}  
            />

             
               {openEditModal && (
                <UpdateSolutionModel
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                    solutionId={editSolutionId} 
                    token={localStorage.getItem('accessToken')}
                />
            )}
        </div>
    );
};

export default SolutionPage;
