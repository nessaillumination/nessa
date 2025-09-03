import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function ApplicationSwiper({ product }) {
  return (
    <div className="relative px-4 py-8">
      {product.applicationImageUrls.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
            dynamicMainBullets: 3,
            clickable: true,
          }}
          navigation={{
            clickable: true,
          }}
          breakpoints={{
            550: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            }
          }}
          modules={[Pagination, Navigation, EffectFade, Autoplay]}
          className="pb-12"
        >
          {product.applicationImageUrls.map((image, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={`Application ${index + 1}`}
                    className="w-full h-[250px] object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex items-center justify-center h-48 text-gray-500">
          No application images available
        </div>
      )}

      <style jsx>{`
        .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #e2e8f0;
          opacity: 1;
        }
        
        .swiper-pagination-bullet-active {
          background: #3b82f6;
          width: 20px;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        
        .swiper-button-next,
        .swiper-button-prev {
          color: #3b82f6;
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        
        .swiper-button-disabled {
          opacity: 0;
          cursor: default;
        }
      `}</style>
    </div>
  );
}