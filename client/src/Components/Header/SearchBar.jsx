import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import debounce from 'lodash/debounce'
import { useProducts } from '../../context/ProductContext'

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [results, setResults] = useState([])
    const { searchProducts, loading, products, getProducts } = useProducts()
    const navigate = useNavigate()
    const searchInputRef = useRef(null)
    const searchContainerRef = useRef(null)
    const [hasInitializedProducts, setHasInitializedProducts] = useState(false)

    useEffect(() => {

         const handleFocusSearch = () => {
             if (searchInputRef.current) {
                 searchInputRef.current.focus()
             }
         }
        // Add event listener for search focus
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setSearchQuery('')
                setResults([])
                if (searchInputRef.current) {
                    searchInputRef.current.blur()
                }
            }
        }

        window.addEventListener('focusSearchInput', handleFocusSearch)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('focusSearchInput', handleFocusSearch)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const debouncedSearch = debounce(async () => {
            // Only search if query is 2 or more characters
            if (searchQuery.length >= 2) {
                // If products haven't been fetched yet, fetch them first
                if (!hasInitializedProducts && !products.length) {
                    await getProducts()
                    setHasInitializedProducts(true)
                }

                const searchResults = searchProducts(searchQuery)
                setResults(searchResults)
            } else {
                setResults([])
            }
        }, 300)

        debouncedSearch()
        return () => debouncedSearch.cancel()
    }, [searchQuery, searchProducts, products.length, hasInitializedProducts])

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleProductClick = (product) => {
        navigate(`/product/${product.slug}/${product._id}`)
        setSearchQuery('')
        setResults([])
    }

    return (
        <div
            className="relative"
            ref={searchContainerRef}>
            <div className="flex max-sm:w-[170px] items-center bg-[#2672BE] rounded-full px-3 py-1">
                <CiSearch className="w-5 h-5 text-white" />
                <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder={loading ? 'Loading products...' : 'Search Product'}
                    className="ml-2 max-sm:w-[120px] outline-none bg-[rgb(38,114,190)] text-white placeholder:text-[#ffffffe5]"
                    // disabled={loading}
                />
            </div>

            {(results.length > 0 || loading) && searchQuery.length >= 2 && (
                <div
                    id="mq"
                    className=" absolute top-full left-0 mt-1 w-[300px] max-h-[500px] overflow-y-auto  bg-white rounded-lg shadow-lg z-[99999999]">
                    <style>
                        {`
                            #mq {
                                scrollbar-width: none; 
                                -ms-overflow-style: none;  
                                scroll-behavior: smooth;
                            }
                            #mq::-webkit-scrollbar {
                                display: none;  
                            }
                            `}
                    </style>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                        </div>
                    ) : (
                        <div
                            id="mq"
                            className="max-h-[500px] overflow-y-auto">
                            {results.map((product) => (
                                <div
                                    key={product._id}
                                    onClick={() => handleProductClick(product)}
                                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
                                    <div className="flex items-center gap-3">
                                        {product.productImageUrl && product.productImageUrl[0] && (
                                            <img
                                                src={product.productImageUrl[0]}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        )}
                                        <div>
                                            <div className="font-medium text-sm">{product.name}</div>
                                            <div className="text-xs text-gray-500">
                                                {product.categories} - {product.subcategories}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar
