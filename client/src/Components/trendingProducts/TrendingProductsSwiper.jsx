
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { fetchProducts } from '../../services/api.services';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function TrendingProductsSwipe() {

  const navigate = useNavigate()


  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true)
        const params = {
          limit: 12,
          offset: 0,
          query: 'popular',

        }

        const response = await fetchProducts(params)
        if (response?.data) {
          setProducts(response.data.products)
        }
      } catch (error) {
        console.error('Error fetching product data:', error)
        toast.error('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredProducts()
  }, [])

  
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
        )
    }

  return (
      <>
          <Swiper
              slidesPerView={1}
              spaceBetween={5}
              pagination={{
                  dynamicBullets: true,
                  dynamicMainBullets: 3,
                  clickable: true
              }}
              navigation={{
                  clickable: true
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
                  800: {
                      slidesPerView: 3,
                      spaceBetween: 20
                  },
                  1280: {
                      slidesPerView: 4,
                      spaceBetween: 20
                  }
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper mt-[40px]   ">
              {products.map((product, index) => (
                  <SwiperSlide
                      key={index}
                      className="  ">
                      <div className=" h-[400px] w-full max-sm:flex max-sm:flex-col max-sm:items-center  mb-[40px]  p-[10px]  border-[2px] bg-white border-[#d6d0d0] ">
                          <Link
                              to={`/product/${product.slug}/${product._id}`}
                              className="w-full h-full ">
                              <img
                                  className=" mb-[10px] w-full h-[70%] object-contain"
                                  src={product.productImageUrl[0]}
                                  loading='lazy'
                                  alt={product.name + ' Image'}
                              />
                              <h1 className="text-sm">
                                  {product.categories}- {product.subcategories}
                              </h1>
                              <h1 className="mt-[10px] text-xl">{product.name}</h1>
                          </Link>
                      </div>
                  </SwiperSlide>
              ))}
          </Swiper>
      </>
  )
}
