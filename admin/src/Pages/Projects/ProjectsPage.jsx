import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion'
import ProjectModel from '../../Components/Modal/ProjectModel'
import { useNavigate } from 'react-router-dom'
import { isTokenExpired } from '../../utils/utils'
import { queryProjects } from '../../service/apiService'
import toast from 'react-hot-toast'
import Pagination from '@mui/material/Pagination'
import EditIcon from '@mui/icons-material/Edit'
import { CircularProgress } from '@mui/material'
import ProjectDetailsModal from '../../Components/Modal/ProjectDetailsModal'
import DeleteModal, { DELETEMODELBYTYPE } from '../../Components/DeleteModal';

const ProjectsPage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openDetailsModal, setOpenDetailsModal] = useState(false)
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(6)
    const navigate = useNavigate()
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [deletemodalOpen, setDeleteModalOpen] = useState(false);
    const [deletedData, setDeletedData] = useState(null)


    const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    const handleOpenDetailsModal = (project, category) => {
        setSelectedProject(project)
        setSelectedCategory(category)
        setOpenDetailsModal(true)
    }
    const handleCloseDetailsModal = () => {
        setSelectedProject(null)
        setSelectedCategory(null)
        setOpenDetailsModal(false)
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (!token || isTokenExpired(token)) {
            navigate('/')
        }
    }, [navigate])

    const fetchProjects = async () => {
        setLoading(true)
        try {
            const response = await queryProjects()
            if (response.data) {
                setProjects(response.data)
            } else {
                toast.error('Failed to fetch projects')
            }
        } catch (error) {
            console.error('Error fetching projects:', error)
            toast.error('An error occurred while fetching projects')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {

        fetchProjects()
    }, [openModal])

    const openDeleteModal = (data) => {
        setDeletedData(data)
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeletedData(null)
        fetchProjects()
    };

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem)

    const handlePageChange = (event, value) => {
        setCurrentPage(value)
    }

    


    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">Projects</h1>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-6">
                    {currentProjects.map((category) => (
                        <div key={category._id}>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">{category.categories}</h2>
                            <div className="space-y-4">
                                {category.projects.map((project, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
                                        <div className="absolute top-2 right-2 flex gap-2 z-10">
                                            <button
                                                onClick={() => {
                                                    setSelectedProject(category)
                                                    handleOpenModal()
                                                }}
                                                className="bg-blue-500 text-white p-2 rounded-full">
                                                <EditIcon />
                                            </button>
                                            <button
                                                onClick={() => handleOpenDetailsModal(project, category.categories)}
                                                className="bg-green-500 text-white p-2 rounded-full">
                                                <VisibilityIcon />
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(category)}
                                                className="bg-red-500 text-white p-2 rounded-full">
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="h-40 w-full object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">{project.title}</h3>
                                            <p className="text-gray-600">{project.place}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-8">
                <Pagination
                    count={Math.ceil(projects.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>

            <motion.button
                className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-blue-600 text-white rounded-full p-3 sm:p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleOpenModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <AddIcon />
            </motion.button>

            <ProjectModel
                open={openModal}
                onClose={handleCloseModal}
                token={localStorage.getItem('accessToken')}
                existingProject={selectedProject}
            />

            <ProjectDetailsModal
                open={openDetailsModal}
                onClose={handleCloseDetailsModal}
                project={selectedProject}
                category={selectedCategory}
            />


            <DeleteModal
                open={deletemodalOpen}
                onClose={closeDeleteModal}
                id={deletedData?._id}
                type={DELETEMODELBYTYPE.PROJECT}
            />
        </div>
    )
}

export default ProjectsPage