import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import solar from '../../../assets/images/homepageimages/solar.png'
import street from '../../../assets/images/homepageimages/street.png'
import whitepaper from '../../../assets/images/homepageimages/whitepaper.png'
import { Link } from 'react-router-dom'
import { fetchBlogs } from '../../../services/api.services'

const sampleSlideData = [
    {
        image: solar,
        category: 'Blog',
        title: 'Solar Lighting in Streets',
        link: 'Read More'
    },
    {
        image: street,
        category: 'Case Study',
        title: 'How our Street Light is 20% efficient than others',
        link: 'Read More'
    },
    {
        image: whitepaper,
        category: 'White Paper',
        title: 'Explore Nessa Legacy since 16 years',
        link: 'Read More'
    },
    {
        image: solar,
        category: 'Blog',
        title: 'Innovative Solar Solutions',
        link: 'Read More'
    },
    {
        image: street,
        category: 'Case Study',
        title: 'Efficiency in Modern Lighting',
        link: 'Read More'
    },
    {
        image: whitepaper,
        category: 'White Paper',
        title: 'Sustainable Energy Practices',
        link: 'Read More'
    }
]

export default function InsitesSwiper() {
    const [slidepre, setslidepre] = useState(window.innerWidth < 500 ? 1 : 3)
    const [slideData, setSlideData] = useState(sampleSlideData)

    useEffect(() => {
        const handleResize = () => {
            setslidepre(window.innerWidth < 600 ? 1 : 3)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const response = await fetchBlogs().then((res) =>
                    res.data.blogs.map((blg) => ({
                        title: blg.title,
                        category: blg.resource_type,
                        link: `/resources/blogs/${blg.slug}/${blg._id}`,
                        image: blg.thumbnailImage
                    }))
                )

                // Update each section with filtered items based on resourceType
                // const updatedResources = resources.map((section) => ({
                //     ...section,
                //     items: response.data.blogs.filter((item) => item.resource_type === section.resourceType)
                // }))

                setSlideData(response)
            } catch (error) {
                console.error('Blog fetch failed')
            } 
        }
        loadBlogs()
    }, [])


    return (
        <Swiper
            slidesPerView={slidepre}
            spaceBetween={30}
            pagination={{
                dynamicBullets: true,
                clickable: true
            }}
            navigation={{
                clickable: true
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                waitForTransition: true,
                enabled: true // Changed to true since we're managing it manually
            }}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper"
            style={{ paddingLeft: '50px', paddingRight: '50px', height: '100%' }}>
            {slideData.map((slide, index) => (
                <SwiperSlide
                    key={index}
                    className="mb-[50px]">
                    <div className="slide-content flex flex-col max-w-96 gap-4">
                        <img
                            className="rounded-xl max-h-52"
                            loading="lazy"
                            src={slide.image}
                            alt={slide.title}
                        />
                        <div className="slide-text flex flex-col gap-2">
                            <h4>{slide.category}</h4>
                            <h3 className="font-bold text-sm">{slide.title}</h3>
                            <Link to={slide.link} title={`${window.location.origin}${slide.link}`} className='underline-offset-4 text-blue-600 underline '>read more</Link>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
