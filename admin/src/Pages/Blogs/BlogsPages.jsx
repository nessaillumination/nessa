import { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import CircularProgress from '@mui/material/CircularProgress'
import AddIcon from '@mui/icons-material/Add'
import BlogModal from '../../Components/Modal/BlogModal'
import BlogDetailsModal from '../../Components/Modal/BlogDetailsModal'
import { useNavigate } from 'react-router-dom'
import { BLOG_TYPES, isTokenExpired } from '../../utils/utils'
import { MOCK_BLOGS } from './config'
import { getBlog } from '../../service/apiService'
import { DeleteModalButton, DELETEMODELBYTYPE } from '../../Components/DeleteModal'
const BlogPage = () => {
    const [blogs, setBlogs] = useState([])
    const [filteredBlogs, setFilteredBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [openModal, setOpenModal] = useState(false)
    const [searchTitle, setSearchTitle] = useState('')
    const [searchTag, setSearchTag] = useState('')
    const [searchType, setSearchType] = useState('')
    const [blogToEdit, setBlogToEdit] = useState(null)
    const [openDetailsModal, setOpenDetailsModal] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState(null)

    const navigate = useNavigate()
    const itemsPerPage = 6

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (!token || isTokenExpired(token)) {
            navigate('/')
        }
    }, [navigate])

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const response = await getBlog('all', itemsPerPage, (page - 1) * itemsPerPage)

            setBlogs(response.data.blogs)
            setTotalPages(Math.ceil(response.data.total / itemsPerPage))
        } catch (error) {
            console.error('Failed to fetch blogs:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        fetchBlogs()
    }, [page])

    // useEffect(() => {
    //     setLoading(true);
    //     // Simulate API delay
    //     setTimeout(() => {
    //         const startIndex = (page - 1) * itemsPerPage;
    //         const endIndex = startIndex + itemsPerPage;
    //         setBlogs(MOCK_BLOGS);
    //         setFilteredBlogs(MOCK_BLOGS);
    //         setTotalPages(Math.ceil(MOCK_BLOGS.length / itemsPerPage));
    //         setLoading(false);
    //     }, 500); // 500ms delay to simulate network request
    // }, [page]);

    useEffect(() => {
        let filtered = blogs

        if (searchTitle) {
            filtered = filtered.filter((blog) => blog.title.toLowerCase().includes(searchTitle.toLowerCase()))
        }

        if (searchTag) {
            filtered = filtered.filter((blog) => blog.tag.toLowerCase().includes(searchTag.toLowerCase()))
        }
        if (searchType) {
            filtered = filtered.filter((blog) =>
                blog.type === searchType
            );
        }

        setFilteredBlogs(filtered)
        setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    }, [searchTitle, searchTag, searchType, blogs])

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const handleOpenModal = (blog = null) => {
        setBlogToEdit(blog)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setBlogToEdit(null)
    }

    const handleViewDetails = (blog) => {
        setSelectedBlog(blog)
        setOpenDetailsModal(true)
    }

    const handleCloseDetails = () => {
        setOpenDetailsModal(false)
        setSelectedBlog(null)
    }

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text
        return text.slice(0, maxLength) + '...'
    }


    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Blog Posts</h1>

            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by Title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Search by Tag"
                    value={searchTag}
                    onChange={(e) => setSearchTag(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Blog Types</option>
                    {Object.entries(BLOG_TYPES).map(([label, value]) => (
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
                    {filteredBlogs.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((blog) => (
                        <div
                            key={blog._id}
                            className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                            <img
                                src={blog.thumbnailImage}
                                alt={blog.title}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-lg font-semibold">{blog.title}</h2>
                            <p className="text-sm text-gray-600 mb-3">
                                {truncateText(blog.description, 100)}
                            </p>
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src={blog.userImage}
                                    alt={blog.userName}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="text-sm text-gray-700">{blog.userName}</span>
                            </div>
                            <div className="mb-4">
                                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                    {blog.tag}
                                </span>
                            </div>
                            <div className='flex items-center gap-2 justify-start mb-2'>
                                <h3 className=" ">Resource Type</h3> :
                                <p className="text-blue-700 ">{blog?.resource_type?.replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleViewDetails(blog)}>
                                    View Details
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleOpenModal(blog)}>
                                    Edit
                                </button>
                                <DeleteModalButton id={blog?._id} type={DELETEMODELBYTYPE.BLOG} fetchData={fetchBlogs}>

                                </DeleteModalButton>
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
                className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleOpenModal()}>
                <AddIcon />
            </button>

            <BlogModal
                open={openModal}
                onClose={handleCloseModal}
                token={localStorage.getItem('accessToken')}
                blog={blogToEdit}
            />

            <BlogDetailsModal
                open={openDetailsModal}
                onClose={handleCloseDetails}
                blog={selectedBlog}
            />
        </div>
    )
}

export default BlogPage