import { useEffect, useState } from 'react'
import RelatedProductsSwipe from './RelatedProducts'
import ProductTabs from './Productdetails'
import Navbar from '../../Components/Header/Navbar'
import SideComponent from '../../Components/sideComponent/SideComponent'
import { useParams } from 'react-router-dom'
import { fetchProduct, increaseIsEnquired } from '../../services/api.services'
import toast from 'react-hot-toast'
import ShareButton from '../../Components/ShareButton'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'
import ImageViewer from './ZoomableImage'

const Product = () => {
    const { id } = useParams()
    const [selectedImage, setSelectedImage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [loadingEnquire, setLoadingEnquire] = useState(null)
    const [product, setproduct] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetchProduct(id)
                if (response) {
                    setproduct(response.data)
                    setSelectedImage(0)
                } else {
                    toast.error('something went wrong')
                }
            } catch (e) {
                toast.error(e.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    const enquireAdd = async (productId) => {
        try {
            setLoadingEnquire(productId)
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
            setLoadingEnquire(null)
        }
    }

    const photoSection = () => {
        if (!product?.productImageUrl?.length) return null

        return (
            <>
                <div
                    id="mq"
                    className="w-fit px-2 flex flex-col h-full overflow-y-auto overflow-x-hidden  max-lg:flex-wrap max-lg:flex-row gap-2">
                    <style>
                        {`#mq::-webkit-scrollbar{
                           display: none;
                          }`}
                    </style>
                    {product.productImageUrl.map((imgUrl, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`border-2 rounded-lg p-1 h-[100px] max-sm:h-[50px] w-[100px] max-sm:w-[50px] bg-blue-50 ${
                                selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                            }`}>
                            <img
                                src={imgUrl}
                                loading="lazy"
                                alt={`${product.name} - View ${index + 1}`}
                                className="w-full h-full object-contain"
                            />
                        </button>
                    ))}
                </div>
                <ImageViewer
                    images={product.productImageUrl}
                    selectedIndex={selectedImage}
                    onSelectedIndexChange={setSelectedImage}
                />
            </>
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
        )
    }

    return (
        <div className="overflow-hidden text-lg">
            <Navbar />
            <SideComponent />

            <div className="w-full flex max-lg:flex-col max-lg:gap-10 px-[5vw] py-[50px]">
                <div className="w-1/2 max-lg:hidden  max-lg:w-full flex max-lg:flex-col gap-5 h-[500px] max-lg:h-fit">{photoSection()}</div>
                <div className="w-1/2 max-lg:w-full  justify-between px-2 flex flex-col gap-6">
                    <div>
                        <div className="flex justify-between items-start ">
                            <h1 className="text-3xl font-bold">{product.name}</h1>

                            <div className="flex gap-4">
                                <ShareButton title={product.name} />
                            </div>
                        </div>

                        <p className="text-gray-600 border-b text-base">SKUId : {product.SKUId}</p>
                    </div>
                    <p className="text-gray-600 text-base">
                        Category : {product.categories}-{product.subcategories}
                    </p>
                    <p className="text-gray-700">{product.description}</p>

                    <div className="w-1/2 hidden max-lg:flex max-lg:w-full  max-lg:flex-col gap-5 h-[500px] max-lg:h-fit">{photoSection()}</div>
                    <div className="flex gap-4 max-sm:text-sm">
                        <button
                            onClick={() => enquireAdd(product._id)}
                            className={` bg-blue-500 text-white border border-blue-500   px-6 py-3 rounded-lg transition-colors ${
                                loadingEnquire === product._id ? 'opacity-80 cursor-not-allowed' : 'hover:bg-blue-600'
                            }`}
                            disabled={loadingEnquire === product._id}>
                            {loadingEnquire === product._id ? 'Loading...' : 'Enquire Now'}
                        </button>
                        <Link
                            to={product.brochureUrl}
                            target="_blank"
                            download
                            className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-50">
                            Download Datasheet
                        </Link>
                    </div>
                </div>
            </div>

            <ProductTabs product={product} />

            {product.feature.useCases.length > 0 && (
                <div className="bg-blue-100">
                    {product.feature.useCases.map((useCase, index) =>
                        useCase.title || useCase.description || useCase.imageUrl ? (
                            index % 2 === 0 ? (
                                <div
                                    key={index}
                                    className="w-full min-h-[300px] py-16 max-md:pb-2 px-[5vw] text-center">
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                                        {useCase.imageUrl && (
                                            <img
                                                loading='lazy'
                                                className="w-full md:w-1/2 h-auto object-contain hidden max-md:block shadow-lg"
                                                src={useCase.imageUrl}
                                                alt=""
                                            />
                                        )}
                                        <div className="text-left md:w-1/2">
                                            {useCase.title && <h3 className="text-2xl font-bold mb-2">{useCase.title}</h3>}
                                            {useCase.description && <p className="mb-4">{useCase.description}</p>}
                                        </div>
                                        {useCase.imageUrl && (
                                            <img
                                                loading='lazy'
                                                className="w-full md:w-1/2 h-[350px] object-contain max-md:hidden shadow-lg"
                                                src={useCase.imageUrl}
                                                alt={useCase.title + ' Image'}
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={index}
                                    className="w-full min-h-[300px] pt-16 max-md:pb-2 px-[5vw] text-center relative">
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 z-[2] relative">
                                        {useCase.imageUrl && (
                                            <img
                                                loading='lazy'
                                                className="w-full md:w-1/2 h-[350px] object-contain shadow-lg z-[2]"
                                                src={useCase.imageUrl}
                                                alt={useCase.title + ' Image'}
                                            />
                                        )}
                                        <div className="text-left md:w-1/2">
                                            {useCase.title && <h3 className="text-2xl font-bold mb-2">{useCase.title}</h3>}
                                            {useCase.description && <p className="mb-4">{useCase.description}</p>}
                                        </div>
                                    </div>
                                </div>
                            )
                        ) : null
                    )}
                </div>
            )}

            <div className=" mb-10">
                <div className="px-[5vw] flex flex-col items-center  gap-2 my-[50px]">
                    <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                        <span className="text-blue-500"> Related</span> Products
                    </div>
                    <div className="flex relative shrink-0 mt-4 h-2.5 bg-[var(--light-blue)] rounded-[50px] w-[51px]" />
                </div>

                <div className="px-[5vw]">
                    <RelatedProductsSwipe product={product} />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Product

