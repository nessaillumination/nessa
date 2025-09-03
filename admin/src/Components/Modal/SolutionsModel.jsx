import { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import PropTypes from 'prop-types'
import { getProduct, saveSolution, uploadFile } from '../../service/apiService'
import { toast } from 'react-hot-toast'

const SolutionsModel = ({ open, onClose, token }) => {
    const [formData, setFormData] = useState({
        title: '',
        subTitle: '',
        description: '',
        categories: 'Solutions',
        subcategories: '',
        thumbnail: null,
        solutionImageUrl: null,
        relatedProduct: [
            {
                title: '',
                application: '',
                products: []
            }
        ]
    })

    console.log(formData);
    

    const [loading, setLoading] = useState(false)
    const title = [
        'Airports',
        'Mines',
        'Stadium',
        'Petrol Pump',
        'Refinery',
        'Highways',
        'Tunnels',
        'Rural, Hilly & Forest Areas',
        'Ports & Logistic Parks',
        'Hazardous Areas',
        'Thermal Power Plants',
        'Solar Parks'
    ]
    const [availableProducts, setAvailableProducts] = useState([])
    const [uploadsComplete, setUploadsComplete] = useState({ thumbnail: false, solutionImageUrl: false })

    const fetchProducts = async () => {
        try {
            const response = await getProduct('all', 0, 0)
            const data = response.data.products
            const productDatas = data.map((element) => ({
                productId: element._id,
                name: element.name,
                description: element.description
            }))
            setAvailableProducts(productDatas)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleInputChange = (e, index) => {
        const { name, value } = e.target
        const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()

        if (name.startsWith('relatedProduct.')) {
            const field = name.split('.')[1]
            setFormData((prev) => {
                const updatedRelatedProducts = [...prev.relatedProduct]
                updatedRelatedProducts[index] = {
                    ...updatedRelatedProducts[index],
                    [field]: value
                }
                return { ...prev, relatedProduct: updatedRelatedProducts }
            })
        } else {
            setFormData((prev) => ({ ...prev, [name]: formattedValue }))
        }
    }

    const handleProductSelect = (e, index) => {
        const selectedProductIds = Array.from(e.target.selectedOptions, (option) => option.value)
        const selectedProducts = selectedProductIds.map((productId) => {
            const product = availableProducts.find((p) => p.productId === productId)
            return { productId: product.productId, name: product.name, description: product.description }
        })

        setFormData((prev) => {
            const updatedRelatedProducts = [...prev.relatedProduct]
            updatedRelatedProducts[index] = {
                ...updatedRelatedProducts[index],
                products: selectedProducts
            }
            return { ...prev, relatedProduct: updatedRelatedProducts }
        })
    }

    const addRelatedProduct = () => {
        setFormData((prev) => ({
            ...prev,
            relatedProduct: [
                ...prev.relatedProduct,
                {
                    title: '',
                    application: '',
                    products: []
                }
            ]
        }))
    }

    const removeRelatedProduct = (index) => {
        setFormData((prev) => ({
            ...prev,
            relatedProduct: prev.relatedProduct.filter((_, i) => i !== index)
        }))
    }

    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0]
        if (!file) return

        if (file.size > 1000000) {
            toast.error('File size must be less than 1MB')
            e.target.value = null
            return
        }

        setLoading(true)
        try {
            const uploadData = new FormData()
            uploadData.append('file', file)

            if (type === 'thumbnail') {
                uploadData.append('category', 'THUMBNAIL')
            } else if (type === 'solutionImageUrl') {
                uploadData.append('category', 'SOLUTION_IMAGE')
            } else {
                toast.error('Invalid upload type')
                return
            }

            const response = await uploadFile(uploadData)
            if (response.success) {
                setFormData((prev) => ({
                    ...prev,
                    [type]: response.data
                }))
                setUploadsComplete((prev) => ({ ...prev, [type]: true }))
                toast.success('File uploaded successfully')
            } else {
                toast.error('File upload failed')
            }
        } catch (error) {
            console.error('Upload failed:', error)
            toast.error('An error occurred during file upload')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!uploadsComplete.thumbnail || !uploadsComplete.solutionImageUrl) {
            toast.error('Please upload both thumbnail and solution image before submitting')
            return
        }

        setLoading(true)
        try {
            const response = await saveSolution(token, formData)
            if (response.success) {
                toast.success('Solution saved successfully')
                onClose()
                fetchProducts()
            } else {
                toast.error('Solution save failed')
            }
        } catch (error) {
            console.error('Submission failed:', error)
            toast.error('An error occurred during submission')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0, 0, 0, 0.7)'
            }}>
            <motion.div
                className="bg-white p-8 rounded-xl shadow-2xl w-[600px] max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 500 }}>
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Solution</h2>
                <p className="text-sm text-gray-500">Note: Sentence case is allowed for input fields</p>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">
                    {/* Basic fields remain the same */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(e) => handleInputChange(e)}
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input
                            type="text"
                            name="subTitle"
                            value={formData.subTitle}
                            onChange={(e) => handleInputChange(e)}
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange(e)}
                            rows="4"
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                            required
                        />
                    </div>

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                        <select
                            name="subcategories"
                            value={formData.subcategories}
                            onChange={(e) => handleInputChange(e)}
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                            required>
                            <option value="">Select a subcategory</option>
                            {subcategoriesList.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div> */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sub Categories</label>
                        <select
                            name="subcategories"
                            value={formData.subcategories}
                            onChange={(e) => handleInputChange(e)}
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                            required>
                            {title.map((titleOption, index) => (
                                <option
                                    key={index}
                                    value={titleOption}>
                                    {titleOption}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Related Products Section */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-800">Related Products</h3>
                            <button
                                type="button"
                                onClick={addRelatedProduct}
                                className="flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-700">
                                <AddCircleOutlineIcon className="mr-1" />
                                Add Product
                            </button>
                        </div>

                        {formData.relatedProduct.map((product, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-lg border border-gray-200 relative">
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeRelatedProduct(index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                        <DeleteOutlineIcon />
                                    </button>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Related Product Title</label>
                                        <input
                                            type="text"
                                            name="relatedProduct.title"
                                            value={product.title}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Application</label>
                                        <input
                                            type="text"
                                            name="relatedProduct.application"
                                            value={product.application}
                                            onChange={(e) => handleInputChange(e, index)}
                                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Select Products</label>
                                        <select
                                            multiple
                                            value={product.products.map((p) => p.productId)}
                                            onChange={(e) => handleProductSelect(e, index)}
                                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
                                            required>
                                            {availableProducts.map((availableProduct) => (
                                                <option
                                                    key={availableProduct.productId}
                                                    value={availableProduct.productId}>
                                                    {availableProduct.name}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple products</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* File Upload Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FileUpload
                            label="Upload Thumbnail"
                            file={formData.thumbnail}
                            onUpload={(e) => handleFileUpload(e, 'thumbnail')}
                        />

                        <FileUpload
                            label="Upload Solution Image"
                            file={formData.solutionImageUrl}
                            onUpload={(e) => handleFileUpload(e, 'solutionImageUrl')}
                        />
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-5 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:opacity-90 transition-opacity ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={loading}>
                            {loading ? 'Saving...' : 'Save Solution'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </Modal>
    )
}

const FileUpload = ({ label, file, onUpload }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
        <label className="cursor-pointer block">
            <CloudUploadIcon className="text-gray-400 text-3xl mb-2" />
            <span className="block text-sm font-medium text-gray-700">{label}</span>
            <input
                type="file"
                onChange={onUpload}
                accept="image/*"
                className="hidden"
            />
            {file && (
                <div className="mt-2">
                    <p className="text-sm text-green-600">File uploaded</p>
                    <img
                        src={file}
                        alt="Preview"
                        className="mt-2 max-h-20 mx-auto"
                    />
                </div>
            )}
        </label>
    </div>
)

SolutionsModel.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
}

FileUpload.propTypes = {
    label: PropTypes.string.isRequired,
    file: PropTypes.string,
    onUpload: PropTypes.func.isRequired
}

export default SolutionsModel

