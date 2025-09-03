// src/Pages/MediaPage.jsx
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import { DeleteModalButton, DELETEMODELBYTYPE } from '../../Components/DeleteModal';
import MediaModal from '../../Components/Modal/MediaModal';
import MediaDetailsModal from '../../Components/Modal/MediaDetailsModal';
import { isTokenExpired, MEDIA_TYPES } from '../../utils/utils';
import { getMedia } from '../../service/apiService';

const MediaPage = () => {
    const [mediaItems, setMediaItems] = useState([]);
    const [filteredMedia, setFilteredMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchType, setSearchType] = useState('');
    const [mediaToEdit, setMediaToEdit] = useState(null);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);

    const navigate = useNavigate();
    const itemsPerPage = 6;

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token || isTokenExpired(token)) {
            navigate('/');
        }
    }, [navigate]);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const response = await getMedia('all', itemsPerPage, (page - 1) * itemsPerPage);
            setMediaItems(response.data.media);
            setTotalPages(Math.ceil(response.data.total / itemsPerPage));
        } catch (error) {
            console.error('Failed to fetch media:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, [page]);

    useEffect(() => {
        let filtered = mediaItems;

        if (searchTitle) {
            filtered = filtered.filter((media) => 
                media.title.toLowerCase().includes(searchTitle.toLowerCase())
            );
        }

        if (searchType) {
            filtered = filtered.filter((media) => 
                media.resource_type === searchType
            );
        }

        setFilteredMedia(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    }, [searchTitle, searchType, mediaItems]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleOpenModal = (media = null) => {
        setMediaToEdit(media);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setMediaToEdit(null);
    };

    const handleViewDetails = (media) => {
        setSelectedMedia(media);
        setOpenDetailsModal(true);
    };

    const handleCloseDetails = () => {
        setOpenDetailsModal(false);
        setSelectedMedia(null);
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Media Items</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by Title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Media Types</option>
                    {Object.entries(MEDIA_TYPES).map(([label, value]) => (
                        <option key={value} value={value}>
                            {label?.replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMedia.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((media) => (
                        <div
                            key={media._id}
                            className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
                        >
                            <img
                                src={media.thumbnailImage}
                                alt={media.title}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-lg font-semibold text-gray-800">{media.title}</h2>
                            <p className="text-sm text-gray-600 mb-3">
                                {truncateText(media.description, 100)}
                            </p>
                            <div className="flex items-center gap-2 justify-start mb-4">
                                <h3 className="font-semibold text-gray-700">Resource Type:</h3>
                                <p className="text-blue-700">
                                    {media?.resource_type?.replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                    onClick={() => handleViewDetails(media)}
                                >
                                    View Details
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                    onClick={() => handleOpenModal(media)}
                                >
                                    Edit
                                </button>
                                <DeleteModalButton 
                                    id={media?._id} 
                                    type={DELETEMODELBYTYPE.MEDIA} 
                                    fetchData={fetchMedia}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-8 flex justify-center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>

            <button
                className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
                onClick={() => handleOpenModal()}
            >
                <AddIcon />
            </button>

            <MediaModal
                open={openModal}
                onClose={handleCloseModal}
                token={localStorage.getItem('accessToken')}
                media={mediaToEdit}
            />

            <MediaDetailsModal
                open={openDetailsModal}
                onClose={handleCloseDetails}
                media={selectedMedia}
            />
        </div>
    );
};

export default MediaPage;