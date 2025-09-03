import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { queryTestimonial } from '../../services/api.services'
import { toast } from 'react-hot-toast'

export default function PartnersReviewsSwiper() {
    const [slidepre, setslidepre] = useState(window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3)

    useEffect(() => {
        const handleResize = () => {
            setslidepre(window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const [loading, setLoading] = useState(false)
    const [testimonials, setTestimonials] = useState([])

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true)
            try {
                const response = await queryTestimonial()
                if (response.success) {
                    const publishedTestimonials = response.data.filter((testimonial) => testimonial.isPublished)
                    setTestimonials(publishedTestimonials)
                } else {
                    toast.error('Failed to fetch testimonials')
                }
            } catch (error) {
                toast.error('Failed to fetch testimonials')
            } finally {
                setLoading(false)
            }
        }

        fetchTestimonials()
    }, [])

    return (
        <div className="py-[50px]">
            <div className="text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                What Our
                <span className="text-blue-500"> Partners</span> Say
            </div>
            <div className="w-full flex justify-center">
                <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
            </div>
            <div className="relative mt-7 text-xl px-[5vw] mb-4 leading-8 text-center text-zinc-900 max-md:max-w-full">
                Our clients share their stories of success and satisfaction with Nessa's products and services. Your trust drives our innovation!
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                </div>
            ) : testimonials.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">No testimonials found</div>
            ) : (
                <Swiper
                    slidesPerView={slidepre}
                    spaceBetween={50}
                    pagination={{
                        dynamicBullets: true,
                        dynamicMainBullets: 3,
                        clickable: true
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        waitForTransition: true,
                        enabled: true
                    }}
                    navigation={{
                        clickable: true
                    }}
                    onSwiper={(swiper) => {
                        if (!swiper.autoplay?.running) return

                        const observer = new IntersectionObserver(
                            ([entry]) => {
                                if (entry.isIntersecting) {
                                    swiper.autoplay?.start()
                                } else {
                                    swiper.autoplay?.stop()
                                }
                            },
                            { threshold: 0.5 }
                        )

                        if (swiper.el) {
                            observer.observe(swiper.el)

                            swiper.el.addEventListener('mouseenter', () => {
                                swiper.autoplay?.stop()
                            })

                            swiper.el.addEventListener('mouseleave', () => {
                                swiper.autoplay?.start()
                            })

                            const svgElements = swiper.el.querySelectorAll('svg')
                            svgElements.forEach((svg) => {
                                svg.addEventListener('mouseenter', () => {
                                    swiper.autoplay?.stop()
                                    svg.style.transition = 'transform 0.2s ease-in-out'
                                    svg.style.transform = 'scale(1.2)'
                                })

                                svg.addEventListener('mouseleave', () => {
                                    swiper.autoplay?.start()
                                    svg.style.transition = 'transform 0.2s ease-in-out'
                                    svg.style.transform = 'scale(1)'
                                })
                            })
                        }
                    }}
                    modules={[Pagination, Autoplay, Navigation]}
                    className="mySwiper w-full min-h-[550px] relative pt-[50px] px-[5vw]">
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide
                            key={index}
                            className="cursor-pointer flex items-center justify-center mb-[50px]">
                            <div className="bg-blue-500 pb-[30px] rounded-3xl shadow-lg max-w-md transform transition-transform hover:scale-105">
                                <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <img
                                            loading='lazy'
                                            src={testimonial.image}
                                            alt={`${testimonial.name}'s profile`}
                                            className="w-[100px] h-[100px] rounded-full object-cover shadow-md"
                                        />
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                                            <p className="text-gray-600 font-medium">{testimonial.company}</p>
                                        </div>
                                        <div className="relative">
                                            <span className="text-4xl text-blue-500 absolute -left-4 -top-4">"</span>
                                            <p className="text-gray-700 italic pt-4 px-4 leading-relaxed">{testimonial.description}</p>
                                            <span className="text-4xl text-blue-500 absolute -right-4 bottom-0">"</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}
