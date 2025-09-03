
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination , Navigation } from 'swiper/modules';
import { certificates } from './AboutUsConfig';

export default function CertificatesSwiper( ) {

  
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
              breakpoints={{
                  550: {
                      slidesPerView: 2,
                      spaceBetween: 40
                  },
                  640: {
                      slidesPerView: 2,
                      spaceBetween: 40
                  },
                  768: {
                      slidesPerView: 3,
                      spaceBetween: 40
                  },
                  1424: {
                      slidesPerView: 4,
                      spaceBetween: 40
                  }
              }}
              navigation={{
                  clickable: true
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper  mt-[50px]  select-none">
              {certificates.map((img, index) => (
                  <SwiperSlide
                      key={index}
                      className="mb-[50px] select-none ">
                      {
                          <img
                              
                              className="h-[400px] object-contain border-4 w-full  "
                              loading="lazy"
                              src={img}
                              alt={`certificate ${index}`}
                          />
                      }
                  </SwiperSlide>
              ))}
          </Swiper>
      </>
  )
}
