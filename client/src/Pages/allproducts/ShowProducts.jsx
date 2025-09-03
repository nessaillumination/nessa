import React, { useEffect, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { fetchProducts, increaseIsEnquired } from '../../services/api.services'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'

// const categories = {
//     'AC Lighting': [
//         'Street Light',
//         'Flood Light',
//         'Highway Light',
//         'Well Glass Light',
//         'Fission LED Street Light',
//         'Fission Flood Light',
//         'AC High Mast'
//     ],
//     Electronics: ['Drivers', 'Solar Charge Controllers'],
//     Solar: [
//         'Semi Integrated Solar',
//         'LED Street Light (Two in One)',
//         'Integrated Solar',
//         'LED Street Light (All in One)',
//         'Solar LED Street Light',
//         'Solar Pumps',
//         'Solar Roof Top'
//     ],
//     'Hybrid Lights': ['Hybrid Solar Street Light'],
//     'Indoor Lighting': ['Surface', 'Panel', 'Downlight', 'Tube Light']
// }

const categories = {
    'AC Lighting': ['Street Light', 'Flood Light', 'Highway Light', 'Well Glass Light', 'AC High Mast', 'RGB Light', 'Traffic Blinker Light'],
    Electronics: ['DC Drivers', 'Charge Controllers', 'Motion Sensor', 'AC Driver', 'SPD', 'DC Driver & Combo'],
    'Indoor Lighting': ['Surface Light', 'Spike Light', 'Tube Light', 'Down Light', 'Panel Light'],
    Solar: [
        'Semi Integrated Street Light (Two in One)',
        'Integrated Street Light (All In One)',
        'Solar Street Light (Full System)',
        'Solar Pumps',
        'Solar Roof Top',
        'Solar High Mast'
    ],
    'Hybrid Lights': ['Hybrid Semi Integrated Solar Street Light Light', 'Hybrid Integrated Solar Street Light'],

    'Smart Lighting Solutions': ['AC Smart Street Light', 'Solar Smart Street Light']
}

const ITEMS_PER_PAGE = 12

export default function ShowProducts() {
    const navigate = useNavigate()
    const location = useLocation()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [expandedCategories, setExpandedCategories] = useState({
        'AC Lighting': true
    })
    const [selectedFilters, setSelectedFilters] = useState([])
    const [loadingProduct, setLoadingProduct] = useState(null)
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        if (location.state?.selectedCategory && location.state?.selectedSubcategory) {
            setExpandedCategories((prev) => ({
                [location.state.selectedCategory]: true
            }))

            setSelectedFilters([location.state.selectedSubcategory])

            navigate(location.pathname, { replace: true })
        }
    }, [location.state, navigate])

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                setLoading(true)
                const params = {
                    limit: ITEMS_PER_PAGE,
                    offset: (currentPage - 1) * ITEMS_PER_PAGE,
                    query: selectedFilters.length > 0 ? 'required' : 'all',
                    subcategories: selectedFilters.length > 0 ? selectedFilters : undefined
                }

                const response = await fetchProducts(params)
                if (response?.data) {
                    setProducts(response.data.products)
                    setTotalCount(response.data.total || 0)
                }
            } catch (error) {
                console.error('Error fetching product data:', error)
                toast.error('Failed to load products')
            } finally {
                setLoading(false)
            }
        }

        fetchFilteredProducts()
    }, [selectedFilters, currentPage, location.state])

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category]
        }))
    }

    const toggleFilter = (filter) => {
        setSelectedFilters((prev) => {
            const newFilters = prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
            return newFilters
        })
        setCurrentPage(1)
    }

    const enquireAdd = async (productId) => {
        try {
            setLoadingProduct(productId)
            const response = await increaseIsEnquired(productId)
            if (response.success) {
                toast.success('Enquiry added successfully')
            } else {
                toast.error('Enquiry failed')
            }
        } catch (error) {
            console.error(error)
            toast.error('An error occurred')
        } finally {
            setLoadingProduct(null)
        }
    }

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex max-md:flex-col gap-6">
                <div className="w-64 max-md:w-[90%] flex-shrink-0">
                    <div className="border rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">Filters</h2>
                        {Object.entries(categories).map(([category, subcategories], index) => (
                            <div
                                key={index}
                                className="mb-4">
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className="flex text-lg items-center justify-between w-full text-left font-medium mb-2">
                                    <span>{category}</span>
                                    <motion.div
                                        animate={{ rotate: expandedCategories[category] ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}>
                                        <FaChevronDown className="w-4 h-4" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {expandedCategories[category] && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-2 ml-2 overflow-hidden">
                                            {subcategories.map((subcategory, index) => (
                                                <label
                                                    key={index}
                                                    className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFilters.includes(subcategory)}
                                                        onChange={() => toggleFilter(subcategory)}
                                                        className="rounded border-gray-300 cursor-pointer"
                                                    />
                                                    <span className="text-md">{subcategory}</span>
                                                </label>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {products.length > 0 ? (
                    <div className="flex-1">
                        <p className="text-lg text-gray-600 mb-4">
                            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} Results from total{' '}
                            {totalCount}
                        </p>

                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                        onClick={() => navigate(`/product/${product.slug}/${product._id}`)}
                                        className="bg-gray-100 rounded-lg p-4 flex flex-col justify-between">
                                        <img
                                            loading="lazy"
                                            src={product.productImageUrl[0]}
                                            alt={product.name}
                                            className="w-full h-48 object-contain rounded-lg mb-4"
                                        />
                                        <div className="text-sm text-gray-600 mb-1">
                                            {product.categories} - {product.subcategories}
                                        </div>
                                        <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                                        <button
                                            onClick={() => enquireAdd(product._id)}
                                            className={`w-full bg-white border border-blue-500 text-blue-500 rounded-[50px] py-2 transition-colors ${
                                                loadingProduct === product._id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'
                                            }`}
                                            disabled={loadingProduct === product._id}>
                                            {loadingProduct === product._id ? 'Loading...' : 'Enquire Now'}
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-center  items-center space-x-2 mt-8">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="  w-8 h-8 flex  items-center justify-center  rounded-full disabled:opacity-50 hover:bg-gray-300">
                                <IoIosArrowBack />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter((page) => page === 1 || page === totalPages || Math.abs(currentPage - page) <= 2)
                                .map((page, index, array) => (
                                    <React.Fragment key={page}>
                                        {index > 0 && array[index - 1] !== page - 1 && <span className="px-2">...</span>}
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-8 h-8  rounded-full ${currentPage === page ? 'bg-blue-500 text-white' : ' hover:bg-gray-300'}`}>
                                            {page}
                                        </button>
                                    </React.Fragment>
                                ))}

                            <button
                                onClick={() => {
                                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                                }}
                                disabled={currentPage === totalPages}
                                className="  w-8 h-8  flex items-center justify-center  rounded-full disabled:opacity-50 hover:bg-gray-300">
                                <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-[100px] text-center flex items-center text-gray-500 font-semibold  justify-center">
                        {' '}
                        No Product Available{' '}
                    </div>
                )}
            </div>
        </div>
    )
}
