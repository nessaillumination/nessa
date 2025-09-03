import { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import PropTypes from 'prop-types'
import { addProduct, updateProduct, uploadFile } from '../../service/apiService'
import { toast } from 'react-hot-toast'
import { CategoryToSubcategories, EProductCategories } from '../../utils/utils'

const ProductModal = ({ open, onClose, token, product }) => {

    const initialFormState = {
        name: '',
        description: '',
        slug:'',
        categories: Object.values(EProductCategories)[0],
        subcategories: CategoryToSubcategories[Object.values(EProductCategories)[0]][0],
        specification: {},
        feature: {
            highlighted: [''],
            useCases: [
                {
                    title: '',
                    description: '',
                    imageUrl: null
                }
            ]
        },
        productImageUrl: [],
        brochureUrl: null,
        applicationImageUrls: [],
        bestSuitedFor: [],
        SKUId: ''
    }

    const [formData, setFormData] = useState(initialFormState)
    const [loading, setLoading] = useState(false)
    const [newSpecKey, setNewSpecKey] = useState('')
    const [newSpecValue, setNewSpecValue] = useState('')

    const bestSuitedOptions = ['Bank', 'Offices', 'Industries']

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                slug:product.slug || '',
                categories: product.categories || Object.values(EProductCategories)[0],
                subcategories: product.subcategories || CategoryToSubcategories[Object.values(EProductCategories)[0]][0],
                specification: product.specification || {},
                feature: {
                    highlighted: product.feature?.highlighted || [''],
                    useCases: product.feature?.useCases || [
                        {
                            title: '',
                            description: '',
                            imageUrl: null
                        }
                    ]
                },
                productImageUrl: product.productImageUrl || [],
                brochureUrl: product.brochureUrl || null,
                applicationImageUrls: product.applicationImageUrls || [],
                bestSuitedFor: product.bestSuitedFor || [],
                SKUId: product.SKUId || ''
            })
        } else {
            setFormData(initialFormState)
        }
    }, [product])

    useEffect(() => {
        if (!open) {
            setFormData(initialFormState)
        }
    }, [open])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name === 'categories') {
            setFormData((prev) => ({
                ...prev,
                categories: value,
                subcategories: CategoryToSubcategories[value][0]
            }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    const addSpecification = () => {
        if (newSpecKey && newSpecValue) {
            setFormData((prev) => ({
                ...prev,
                specification: {
                    ...prev.specification,
                    [newSpecKey]: newSpecValue
                }
            }))
            setNewSpecKey('')
            setNewSpecValue('')
        }
    }

    // Handle highlighted features
    const addHighlightedFeature = () => {
        setFormData((prev) => ({
            ...prev,
            feature: {
                ...prev.feature,
                highlighted: [...prev.feature.highlighted, '']
            }
        }))
    }

    const updateHighlightedFeature = (index, value) => {
        const newHighlighted = [...formData.feature.highlighted]
        newHighlighted[index] = value
        setFormData((prev) => ({
            ...prev,
            feature: {
                ...prev.feature,
                highlighted: newHighlighted
            }
        }))
    }
    const addUseCase = () => {
        setFormData((prev) => ({
            ...prev,
            feature: {
                ...prev.feature,
                useCases: [...prev.feature.useCases, { title: '', description: '', imageUrl: null }]
            }
        }))
    }

    const updateUseCase = (index, field, value) => {
        const newUseCases = [...formData.feature.useCases]
        newUseCases[index] = { ...newUseCases[index], [field]: value }
        setFormData((prev) => ({
            ...prev,
            feature: {
                ...prev.feature,
                useCases: newUseCases
            }
        }))
    }

    const handleFileUpload = async (e, type, index = null) => {
        const files = e.target.files
        if (!files.length) return

        const maxFileSize = 1000000
        const newUrls = []

        setLoading(true)
        try {
            for (let file of files) {
                if (file.size > maxFileSize) {
                    toast.error('File size must be less than 1MB')
                    continue
                }

                const uploadData = new FormData()
                uploadData.append('file', file)
                uploadData.append('category', type.toUpperCase())

                const response = await uploadFile(uploadData)
                if (response.success) {
                    newUrls.push(response.data)
                } else {
                    toast.error('File upload failed')
                }
            }

            if (newUrls.length) {
                if (type === 'applicationImageUrls') {
                    setFormData((prev) => ({
                        ...prev,
                        applicationImageUrls: [...prev.applicationImageUrls, ...newUrls]
                    }))
                } else if (type === 'useCase') {
                    updateUseCase(index, 'imageUrl', newUrls[0])
                } else if (type === 'productImageUrl') {
                    setFormData((prev) => ({
                        ...prev,
                        productImageUrl: [...prev.productImageUrl, ...newUrls]
                    }))
                } else {
                    setFormData((prev) => ({ ...prev, [type]: newUrls[0] }))
                }
                toast.success('Files uploaded successfully')
            }
        } catch (error) {
            console.error('Upload failed:', error)
            toast.error('File upload failed')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = product ? await updateProduct(token,product._id, formData) : await addProduct(token, formData)

            if (response.success) {
                toast.success(product ? 'Product updated successfully' : 'Product added successfully')
                onClose()
            } else {
                toast.error('Operation failed')
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
                className="bg-white p-8 rounded-xl shadow-2xl w-[800px] max-h-[90vh] overflow-y-auto"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 500 }}>
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">{product ? 'Edit Product' : 'Add New Product'}</h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="categories"
                                    value={formData.categories}
                                    onChange={handleInputChange}
                                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2">
                                    {Object.values(EProductCategories).map((category) => (
                                        <option
                                            key={category}
                                            value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                                <select
                                    name="subcategories"
                                    value={formData.subcategories}
                                    onChange={handleInputChange}
                                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2">
                                    {CategoryToSubcategories[formData.categories].map((subcategory) => (
                                        <option
                                            key={subcategory}
                                            value={subcategory}>
                                            {subcategory}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2"
                                rows="4"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">SKU ID</label>
                            <input
                                type="text"
                                name="SKUId"
                                value={formData.SKUId}
                                onChange={handleInputChange}
                                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2"
                                required
                            />
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="border p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-4">Specifications</h3>
                        <div className="flex gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Key"
                                value={newSpecKey}
                                onChange={(e) => setNewSpecKey(e.target.value)}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={newSpecValue}
                                onChange={(e) => setNewSpecValue(e.target.value)}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
                            />
                            <button
                                type="button"
                                onClick={addSpecification}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                <AddIcon />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(formData.specification).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                    <span>
                                        {key}: {value}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newSpec = { ...formData.specification }
                                            delete newSpec[key]
                                            setFormData((prev) => ({ ...prev, specification: newSpec }))
                                        }}
                                        className="text-red-500">
                                        <DeleteIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Highlighted Features */}
                    <div className="border p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-4">Highlighted Features</h3>
                        {formData.feature.highlighted.map((feature, index) => (
                            <div
                                key={index}
                                className="flex gap-4 mb-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => updateHighlightedFeature(index, e.target.value)}
                                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newHighlighted = formData.feature.highlighted.filter((_, i) => i !== index)
                                        setFormData((prev) => ({
                                            ...prev,
                                            feature: { ...prev.feature, highlighted: newHighlighted }
                                        }))
                                    }}
                                    className="text-red-500">
                                    <DeleteIcon />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addHighlightedFeature}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                            Add Feature
                        </button>
                    </div>

                    {/* Use Cases */}
                    <div className="border p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-4">Use Cases</h3>
                        {formData.feature.useCases.map((useCase, index) => (
                            <div
                                key={index}
                                className="mb-4 p-4 border rounded-lg">
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={useCase.title}
                                        onChange={(e) => updateUseCase(index, 'title', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={useCase.description}
                                        onChange={(e) => updateUseCase(index, 'description', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                    />
                                    <FileUpload
                                        label="Upload Use Case Image"
                                        file={useCase.imageUrl}
                                        onUpload={(e) => handleFileUpload(e, 'useCase', index)}
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addUseCase}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                            Add Use Case
                        </button>
                    </div>

                    <div className="border p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-4">Product Images</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {formData.productImageUrl.map((url, index) => (
                                <div
                                    key={index}
                                    className="relative">
                                    <img
                                        src={url}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-32 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newUrls = formData.productImageUrl.filter((_, i) => i !== index)
                                            setFormData((prev) => ({ ...prev, productImageUrl: newUrls }))
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded">
                                        <DeleteIcon />
                                    </button>
                                </div>
                            ))}
                            <FileUpload
                                label="Add Product Image"
                                onUpload={(e) => handleFileUpload(e, 'productImageUrl')}
                                multiple={true}
                            />
                        </div>
                    </div>

                    {/* File Uploads */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FileUpload
                            label="Upload Brochure"
                            file={formData.brochureUrl}
                            onUpload={(e) => handleFileUpload(e, 'brochureUrl')}
                        />
                    </div>

                    {/* Application Images */}
                    <div className="border p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-4">Application Images</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {formData.applicationImageUrls.map((url, index) => (
                                <div
                                    key={index}
                                    className="relative">
                                    <img
                                        src={url}
                                        alt={`Application ${index + 1}`}
                                        className="w-full h-32 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newUrls = formData.applicationImageUrls.filter((_, i) => i !== index)
                                            setFormData((prev) => ({ ...prev, applicationImageUrls: newUrls }))
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded">
                                        <DeleteIcon />
                                    </button>
                                </div>
                            ))}
                            <FileUpload
                                label="Add Application Image"
                                onUpload={(e) => handleFileUpload(e, 'applicationImageUrls')}
                                multiple={true}
                            />
                        </div>
                    </div>

                    {/* Best Suited For */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Best Suited For</label>
                        <select
                            multiple
                            value={formData.bestSuitedFor}
                            onChange={(e) => {
                                const values = Array.from(e.target.selectedOptions, (option) => option.value)
                                setFormData((prev) => ({ ...prev, bestSuitedFor: values }))
                            }}
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2">
                            {bestSuitedOptions.map((option) => (
                                <option
                                    key={option}
                                    value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple options</p>
                    </div>

                    {/* Submit Buttons */}
                    {/* Submit Buttons */}
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
                            {loading ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </Modal>
    )
}

// FileUpload Component
const FileUpload = ({ label, file, onUpload, multiple = false }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
        <label className="cursor-pointer block">
            <CloudUploadIcon className="text-gray-400 text-3xl mb-2" />
            <span className="block text-sm font-medium text-gray-700">{label}</span>
            <input
                type="file"
                onChange={onUpload}
                accept="image/*, .pdf, .doc, .docx, .txt, .zip, .rar"
                className="hidden"
                multiple={multiple}
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

// PropTypes
ProductModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    product: PropTypes.object
}

FileUpload.propTypes = {
    label: PropTypes.string.isRequired,
    file: PropTypes.string,
    onUpload: PropTypes.func.isRequired,
    multiple: PropTypes.bool
}

export default ProductModal

