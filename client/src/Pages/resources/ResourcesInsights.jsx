import { useEffect, useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { insitesAndResources } from './ResourcesConfig'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchBlogs } from '../../services/api.services'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const ResourcesInsights = () => {
    const [resources, setResources] = useState(insitesAndResources)
    const [loading, setLoading] = useState(true)
    const [openSections, setOpenSections] = useState(['Blogs'])
    const navigate = useNavigate()

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setLoading(true)
                const response = await fetchBlogs()
                
                // Update each section with filtered items based on resourceType
                const updatedResources = resources.map((section) => ({
                    ...section,
                    items: response.data.blogs.filter(
                        item => item.resource_type === section.resourceType
                    )
                }))
                
                setResources(updatedResources)
            } catch (error) {
                console.error('Blog fetch failed')
            } finally {
                setLoading(false)
            }
        }
        loadBlogs()
    }, [])

    const toggleSection = (title) => {
        setOpenSections((prev) => (prev.includes(title) ? prev.filter((section) => section !== title) : [...prev, title]))
    }

    const handleBlogClick = (item) => {
        navigate(`/resources/${item.resource_type.toLowerCase()}/${item.slug}/${item._id}`)
    }

    const renderCard = (item, index) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col gap-4 p-4 rounded-lg border bg-white hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer">
            <div className="w-full h-50 rounded-lg overflow-hidden">
                {item.image ? (
                    <img 
                        loading='lazy'
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[200px] object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No image available</div>
                )}
            </div>

            <div className="space-y-2">
                <div className="text-xs px-2 py-[2px] bg-gray-200 rounded-full w-fit">{item.category}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <h3 className="ml-2 text-sm">{item.sorttitle}</h3>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200">
                        {item.profile.profilePicture && (
                            <img 
                                loading='lazy'
                                src={item.profile.profilePicture}
                                alt={item.profile.author}
                                className="w-full h-full rounded-full object-cover"
                            />
                        )}
                    </div>
                    <div className="text-sm">
                        <div className="font-medium">{item.profile.author}</div>
                        <div className="text-gray-500">
                            {item.profile.date} · {item.profile.readTime}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )

    const renderBlogCard = (item, index) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => handleBlogClick(item)}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col gap-4 p-4 rounded-lg border bg-white hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer">
            <div className="w-full h-50 rounded-lg overflow-hidden">
                {item.thumbnailImage ? (
                    <img 
                        loading='lazy'
                        src={item.thumbnailImage}
                        alt={item.title}
                        className="w-full h-[200px] object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No image available</div>
                )}
            </div>

            <div className="space-y-2">
                <div className="text-xs px-2 py-[2px] bg-gray-200 rounded-full w-fit">{item.category}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <h3 className="ml-2 text-sm">{item.description}</h3>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200">
                        {item.userImage && (
                            <img 
                                loading='lazy'
                                src={item.userImage}
                                alt={item.userName}
                                className="w-full h-full rounded-full object-cover"
                            />
                        )}
                    </div>
                    <div className="text-sm">
                        <div className="font-medium">{item.userName}</div>
                        <div className="text-gray-500">
                            {new Date(item.updatedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
        )
    }

    return (
        <div className="w-screen px-6 pb-6 bg-blue-50">
            <div className="w-full relative py-[50px] px-[5vw]">
                <div className="text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Insights & <span className="text-blue-500">Resources</span>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>
            </div>
           
            <div className="w-full max-w-6xl mx-auto mb-[50px] space-y-4">
                {resources.map((section) => (
                    <motion.div
                        key={section.title}
                        initial={false}
                        className="rounded-lg overflow-hidden">
                        <motion.button
                            onClick={() => toggleSection(section.title)}
                            className="w-full flex justify-between items-center p-4 rounded-lg bg-white border border-gray-300"
                            whileHover={{ backgroundColor: '#D9D9D9' }}
                            whileTap={{ scale: 0.99 }}>
                            <span className="text-xl font-medium">{section.title}</span>
                            <motion.div
                                animate={{
                                    rotate: openSections.includes(section.title) ? 180 : 0
                                }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}>
                                <IoChevronDown />
                            </motion.div>
                        </motion.button>

                        <AnimatePresence>
                            {openSections.includes(section.title) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: 'auto',
                                        opacity: 1,
                                        transition: {
                                            height: {
                                                duration: 0.4,
                                                ease: 'easeInOut'
                                            },
                                            opacity: {
                                                duration: 0.3,
                                                delay: 0.1
                                            }
                                        }
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                        transition: {
                                            height: {
                                                duration: 0.4,
                                                ease: 'easeInOut'
                                            },
                                            opacity: {
                                                duration: 0.3
                                            }
                                        }
                                    }}
                                    className="overflow-hidden">
                                    <div className="py-4">
                                        {section.items.length > 0 ? (
                                            <Swiper
                                                slidesPerView={1}
                                                spaceBetween={20}
                                                pagination={{
                                                    clickable: true,
                                                    dynamicBullets: true,
                                                    dynamicMainBullets: 3
                                                }}
                                                breakpoints={{
                                                    550: {
                                                        slidesPerView: 2,
                                                        spaceBetween: 20
                                                    },
                                                    768: {
                                                        slidesPerView: 2,
                                                        spaceBetween: 30
                                                    },
                                                    1024: {
                                                        slidesPerView: 3,
                                                        spaceBetween: 30
                                                    }
                                                }}
                                                navigation={true}
                                                modules={[Pagination, Navigation]}
                                                className="mySwiper">
                                                <AnimatePresence>
                                                    {section.items.map((item, index) => (
                                                        <SwiperSlide key={index} className="mb-[50px] select-none">
                                                            {renderBlogCard(item, index)}
                                                        </SwiperSlide>
                                                    ))}
                                                </AnimatePresence>
                                            </Swiper>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-gray-500 text-center py-4">
                                                No items available
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default ResourcesInsights
