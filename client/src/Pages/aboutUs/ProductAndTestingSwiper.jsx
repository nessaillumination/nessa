import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Pagination, Navigation } from 'swiper/modules'
import pic3 from '../../assets/images/aboutUs/productTesting/Pic 3.jpg'
import pic4 from '../../assets/images/aboutUs/productTesting/Pic 4.jpg'
import pic from '../../assets/images/aboutUs/productTesting/Pic.jpg'
import qualityInfra1 from '../../assets/images/aboutUs/productTesting/Quality1.jpg'
import qualityInfra2 from '../../assets/images/aboutUs/productTesting/Quality2.jpg'
import qualityInfra3 from '../../assets/images/aboutUs/productTesting/Quality3.jpg'
import qualityInfra4 from '../../assets/images/aboutUs/productTesting/Quality4.jpg'
import whatsapp1 from '../../assets/images/aboutUs/productTesting/WhatsApp Image 2025-01-31 at 14.43.19 (1).jpeg'
import whatsapp2 from '../../assets/images/aboutUs/productTesting/WhatsApp Image 2025-01-31 at 14.43.19.jpeg'


export default function ProductAndTestingSwiper({ data }) {
    const productTestingData = [
        {
            name: 'Integrating Sphere Compact System',
            poster: qualityInfra1
        },
        {
            name: 'Surge Generator',
            poster: qualityInfra2
        },
        {
            name: 'Burning Room',
            poster: qualityInfra3
        },
        {
            name: 'Humidity Chambers',
            poster: qualityInfra4
        },
        {
            name: '',
            poster: pic
        },
        {
            name: '',
            poster: pic3
        },
        {
            name: '',
            poster: pic4
        },
        {
            name: ' ',
            poster: whatsapp1
        },
        {
            name: ' ',
            poster: whatsapp2
        },
  
    ]

    return (
        <>
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
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    690: {
                        slidesPerView: 2,
                        spaceBetween: 40
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    }
                }}
                navigation={{
                    clickable: true
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper mt-[50px] px-[40px] select-none">
                {productTestingData ? (
                    productTestingData.map((product, index) => (
                        <SwiperSlide
                            key={index}
                            className="mb-[50px] select-none">
                            <div className="flex w-full justify-center items-center">
                                <div className="relative h-[30vw] min-h-[400px] border flex justify-center items-center">
                                    <img
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                        src={product.poster}
                                        alt={product.name}
                                    />
                                    <h1 className="absolute bottom-0 rounded-md w-[95%] bg-white text-xl py-[10px] mb-[10px] flex items-center justify-center z-[2]">
                                        {product.name}
                                    </h1>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <div className="text-center">
                        <h1>No Data</h1>
                    </div>
                )}
            </Swiper>
        </>
    )
}
