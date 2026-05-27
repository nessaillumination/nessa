import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { team } from './AboutUsConfig'

export default function TeamSwiper() {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 3
                }}
                loop={true}
                autoplay={{
                    delay: 2500,
                    pauseOnMouseEnter: true
                }}
                breakpoints={{
                    550: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1424: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }}
                navigation={{
                    clickable: true
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper  mt-[50px] select-none">
                {team.length > 0 ? (
                    team.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className="mb-[50px] select-none">
                            <div
                                key={index}
                                className="group max-w-[450px] bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                                {/* Image Container */}
                                <div className="relative overflow-hidden bg-white p-6">
                                    <img
                                        className="w-full h-[340px] object-contain rounded-2xl transition-transform duration-500 group-hover:scale-105"
                                        src={item.image}
                                        loading="lazy"
                                        alt={item.name}
                                    />
                                </div>

                                {/* Content */}
                                <div className="px-6 py-7 text-center">
                                    <h3 className="text-2xl font-semibold text-gray-900">{item.name}</h3>

                                    <p className="text-gray-500 mt-2 text-sm md:text-base leading-relaxed">{item.position}</p>

                                    {/* Bottom Accent */}
                                    <div className="w-12 h-1 bg-orange-500 mx-auto mt-5 rounded-full"></div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <div className="text-center">
                        <h1>No Data </h1>
                    </div>
                )}
            </Swiper>
        </>
    )
}
