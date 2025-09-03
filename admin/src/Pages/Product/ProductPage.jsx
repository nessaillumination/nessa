import { useEffect, useState } from 'react'
import { getProduct } from '../../service/apiService'
import Pagination from '@mui/material/Pagination'
import CircularProgress from '@mui/material/CircularProgress'
import AddIcon from '@mui/icons-material/Add'
import ProductModal from '../../Components/Modal/ProductModal'
import { useNavigate } from 'react-router-dom'
import { isTokenExpired } from '../../utils/utils'
import ProductDetailsModal from '../../Components/Modal/ProductDetailsModal'
import { DeleteModalButton, DELETEMODELBYTYPE } from '../../Components/DeleteModal'

const ProductPage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [openModal, setOpenModal] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchCategory, setSearchCategory] = useState('')
    const [productToEdit, setProductToEdit] = useState(null)
    const [openDetailsModal, setOpenDetailsModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const navigate = useNavigate()
    const itemsPerPage = 6

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (!token || isTokenExpired(token)) {
            navigate('/')
        }
    }, [navigate])

    const fetchProduct = async () => {
        setLoading(true)
        try {
            const response = await getProduct(
                'all', 
                itemsPerPage, 
                (page - 1) * itemsPerPage, 
                searchName, 
                searchCategory
            )

            setProducts(response.data.products)
            setTotalPages(Math.ceil(response.data.total / itemsPerPage))
        } catch (error) {
            console.error('Failed to fetch products:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [page, searchName, searchCategory])

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    const handleOpenModal = (product = null) => {
        setProductToEdit(product)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setProductToEdit(null)
        fetchProduct()
    }

    const handleViewDetails = (product) => {
        setSelectedProduct(product)
        setOpenDetailsModal(true)
    }

    const handleCloseDetails = () => {
        setOpenDetailsModal(false)
        setSelectedProduct(null)
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Product List</h1>

            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchName}
                    onChange={(e) => {
                        setSearchName(e.target.value)
                        setPage(1) // Reset to first page when searching
                    }}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Search by Category"
                    value={searchCategory}
                    onChange={(e) => {
                        setSearchCategory(e.target.value)
                        setPage(1) // Reset to first page when searching
                    }}
                    className="border p-2 rounded w-full"
                />
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                            <img
                                src={product.productImageUrl[0]}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-blue-600 font-bold">{product.categories}</span>
                                <a
                                    href={product.brochureUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-500 underline">
                                    Brochure
                                </a>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleViewDetails(product)}>
                                    View Details
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleOpenModal(product)}>
                                    Edit
                                </button>
                                <DeleteModalButton
                                    id={product?._id}
                                    type={DELETEMODELBYTYPE.PRODUCT}
                                    fetchData={fetchProduct}></DeleteModalButton>
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

            <ProductModal
                open={openModal}
                onClose={handleCloseModal}
                token={localStorage.getItem('accessToken')}
                product={productToEdit}
            />

            <ProductDetailsModal
                open={openDetailsModal}
                onClose={handleCloseDetails}
                product={selectedProduct}
            />
        </div>
    )
}

export default ProductPage
