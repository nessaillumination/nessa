import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const ProductDetailsModal = ({ open, onClose, product }) => {
    if (!product) return null

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
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Product Images */}
                    <div className="grid grid-cols-3 gap-4">
                        {product.productImageUrl?.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`${product.name} ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        ))}
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold">Slug</h3>
                            <p>{product.slug}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Category</h3>
                            <p>{product.categories}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Subcategory</h3>
                            <p>{product.subcategories}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">SKU ID</h3>
                            <p>{product.SKUId}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="font-semibold">Description</h3>
                        <p className="text-gray-700">{product.description}</p>
                    </div>

                    {/* Specifications */}
                    <div>
                        <h3 className="font-semibold">Specifications</h3>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {Object.entries(product.specification || {}).map(([key, value]) => (
                                <div key={key} className="bg-gray-50 p-2 rounded">
                                    <span className="font-medium">{key}:</span> {value}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Highlighted Features */}
                    <div>
                        <h3 className="font-semibold">Highlighted Features</h3>
                        <ul className="list-disc pl-5 mt-2">
                            {product.feature?.highlighted.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Use Cases */}
                    <div>
                        <h3 className="font-semibold">Use Cases</h3>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {product.feature?.useCases.map((useCase, index) => (
                                <div key={index} className="border p-4 rounded-lg">
                                    <h4 className="font-medium">{useCase.title}</h4>
                                    <p className="text-gray-700 mt-2">{useCase.description}</p>
                                    {useCase.imageUrl && (
                                        <img
                                            src={useCase.imageUrl}
                                            alt={useCase.title}
                                            className="mt-2 w-full h-32 object-cover rounded"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Application Images */}
                    <div>
                        <h3 className="font-semibold">Application Images</h3>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            {product.applicationImageUrls?.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Application ${index + 1}`}
                                    className="w-full h-32 object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Best Suited For */}
                    <div>
                        <h3 className="font-semibold">Best Suited For</h3>
                        <div className="flex gap-2 mt-2">
                            {product.bestSuitedFor?.map((item, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Brochure */}
                    {product.brochureUrl && (
                        <div>
                            <h3 className="font-semibold">Brochure</h3>
                            <a
                                href={product.brochureUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline mt-2 inline-block"
                            >
                                Download Brochure
                            </a>
                        </div>
                    )}
                </div>
            </motion.div>
        </Modal>
    )
}

ProductDetailsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    product: PropTypes.object
}

export default ProductDetailsModal