
import ShowProducts from './ShowProducts'
import hero from '../../assets/images/allProductsimages/hero.png'
import Navbar from '../../Components/Header/Navbar';
import SideComponent from '../../Components/sideComponent/SideComponent';
import Footer from '../../Components/Footer';

const Allproducts = () => {
  return (
      <div className="overflow-hidden">
          <Navbar />
          <SideComponent />

          <div className="w-full h-[300px] max-sm:h-[200px] relative flex items-center  justify-center ">
              <img
                  className="w-full h-full object-cover object-left absolute "
                  loading="lazy"
                  src={hero}
                  alt=""
              />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white  relative z-[2] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] ">
                  All Products
              </h1>
          </div>

          <ShowProducts />
          <br />
          <Footer />
      </div>
  )
}

export default Allproducts