import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { investor } from './AboutUsConfig'


export default function InvestorSwiper() {
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
                //     pauseOnMouseEnter: true,
                // }}
                navigation={{
                    clickable: true
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper   mt-[50px]">
                {investor.length > 0 ? (
                    investor.map((investor, i) => (
                        <SwiperSlide
                            key={i}
                            className=" px-[5vw]  ">
                            <div className="w-[100%]  mb-[50px]  border border-orange-400 flex max-md:flex-col max-md:items-center rounded-xl  overflow-hidden">
                                <div className="w-[30%] flex justify-center items-center max-md:w-full ">
                                    <img
                                        className="h-[300px] max-md:h-[300px] max-md:w-full object-contain"
                                        src={investor.image}
                                        loading="lazy"
                                        alt=""
                                    />
                                </div>
                                <div className="w-[70%] max-md:w-full p-[30px] flex flex-col justify-center gap-5">
                                    <h1 className="font-semibold text-orange-400 text-4xl ">Advisor</h1>
                                    <h1 className="font-semibold  text-xl ">{investor.name}</h1>
                                    <h1 className="text-lg">{investor.description}</h1>
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
