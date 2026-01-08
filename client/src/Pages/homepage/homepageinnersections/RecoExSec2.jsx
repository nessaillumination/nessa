import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'
// import awards02 from '../../../assets/images/homepageimages/awards/awards-02.webp'
import awards03 from '../../../assets/images/homepageimages/awards/awards-03.webp'
import awards01 from '../../../assets/images/homepageimages/awards/2.png'
import awards04 from '../../../assets/images/homepageimages/awards/1.png'
import awards05 from '../../../assets/images/homepageimages/awards/3.png'
import awards06 from '../../../assets/images/homepageimages/awards/4.png'
import awards07 from '../../../assets/images/homepageimages/awards/5.png'
import awards08 from '../../../assets/images/homepageimages/awards/6.png'
import awards09 from '../../../assets/images/homepageimages/awards/7.png'
import awards10 from '../../../assets/images/homepageimages/awards/9.png'
import awards11 from '../../../assets/images/homepageimages/awards/10.png'



export default function RecoExSec2() {
  return (
    <div className="w-full">
      <style>
        {`
          .swiper {
            width: 100%;
            
          }
          .swiper-slide {
            text-align: center;
            font-size: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>

      <Swiper
        pagination={{
          dynamicBullets: true
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        watchSlidesProgress={true}
        observer={true}
        observeParents={true}
        className="mySwiper my-[30px]">
        {[
          {
            image: awards03
          },
          {
            image: awards04
          },
          {
            image: awards05
          },
          {
            image: awards01
          },
          {
            image: awards06
          },
          {
            image: awards07
          },
          {
            image: awards08
          },
          {
            image: awards09
          },
          {
            image: awards10
          },
          {
            image: awards11
          }
        ].map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex mb-[50px] flex-col items-center justify-center gap-4">
              <img
                className="h-[300px]  object-cover"
                src={slide.image}
                alt=""
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
