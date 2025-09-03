import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Pagination, Navigation ,Autoplay} from 'swiper/modules'
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
                // autoplay={{
                //     delay: 2500,
                //     pauseOnMouseEnter: true
                // }}
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
                modules={[Pagination, Navigation ,Autoplay]}
                className="mySwiper  mt-[50px] select-none">
                {team.length > 0 ? (
                    team.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className="mb-[50px] select-none">
                            <div className="flex flex-col  items-center text-center">
                                <img
                                    className="rounded-xl h-[350px]  w-[300px] object-contain border  bg-[#e7f2fd] border-orange-400 overflow-hidden "
                                    src={item.image}
                                    loading="lazy"
                                    alt=""
                                />
                                <h1 className="font-semibold text-xl mt-5">{item.name}</h1>
                                <h1 className="opacity-70 mt-1"> {item.position}</h1>
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
