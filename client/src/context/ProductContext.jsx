import { createContext, useState, useContext } from 'react'
import { fetchProducts } from '../services/api.services'
import toast from 'react-hot-toast'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Fetch all products
    const getProducts = async () => {
        try {
            setLoading(true)
            setError(null)

            const params = {
                limit: 1000,
                offset: 0,
                query: 'all'
            }

            const response = await fetchProducts(params)
            if (response?.data) {
                setProducts(response.data.products)
            }
        } catch (error) {
            setError('Failed to load products')
            toast.error('Failed to load products')
        } finally {
            setLoading(false)
        }
    }

    // Search products from loaded products
    const searchProducts = (query) => {
        if (!query) return []

        const searchTerm = query.toLowerCase().trim()
        return products.filter(
            (product) =>
                product.name?.toLowerCase().includes(searchTerm) ||
                product.categories?.toLowerCase().includes(searchTerm) ||
                product.subcategories?.toLowerCase().includes(searchTerm)
        )
    }

    // Get product by id
    const getProductById = (id) => {
        return products.find((product) => product._id === id)
    }

    // Get products by category
    const getProductsByCategory = (category) => {
        return products.filter((product) => product.categories === category)
    }

    // Refresh products
    const refreshProducts = () => {
        getProducts()
    }

    const value = {
        products,
        loading,
        error,
        searchProducts,
        getProductById,
        getProductsByCategory,
        refreshProducts,
        getProducts
    }

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

// Custom hook for using the context
export const useProducts = () => {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider')
    }
    return context
}
