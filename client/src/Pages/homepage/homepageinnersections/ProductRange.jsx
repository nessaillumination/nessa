import { Link, useNavigate } from 'react-router-dom'
import TrendingProductsSwipe from '../../../Components/trendingProducts/TrendingProductsSwiper'
import ACLight from '../../../assets/images/productRange/u1.webp'
import SolarLight from '../../../assets/images/productRange/u2.webp'
import Electronics from '../../../assets/images/productRange/u3.webp'

const categoryMapping = {
    'AC LIGHTS': {
        category: 'AC Lighting',
        firstSubcategory: 'Street Light'
    },
    'SOLAR LIGHTS': {
        category: 'Solar',
        firstSubcategory: 'Semi Integrated Solar'
    },
    ELECTRONICS: {
        category: 'Electronics',
        firstSubcategory: 'Drivers'
    }
}

const categories = [
    {
        name: 'AC LIGHTS',
        image: ACLight
    },
    {
        name: 'SOLAR LIGHTS',
        image: SolarLight
    },
    {
        name: 'ELECTRONICS',
        image: Electronics
    }
]

export function ProductRange() {
    const navigate = useNavigate()

    const handleCategoryClick = (categoryName) => {
        const mappedCategory = categoryMapping[categoryName]
        if (mappedCategory) {
            navigate('/allproducts', {
                state: {
                    selectedCategory: mappedCategory.category,
                    selectedSubcategory: mappedCategory.firstSubcategory
                }
            })
        }
    }

    const renderCategoryCard = ({ name, image }, index) => (
        <div
            key={index}
            className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full cursor-pointer"
            onClick={() => handleCategoryClick(name)}>
            <div className="flex items-center relative flex-col grow justify-center px-5 py-10 text-lg font-semibold tracking-wide leading-relaxed text-center text-black min-h-[620px] max-md:px-5 max-md:py-10 max-md:mt-1 max-md:max-w-full">
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="object-cover absolute inset-0 size-full"
                />
                <div className="relative w-fit px-10 py-5 bg-white rounded-lg hover:bg-gray-100 transition-colors">{name}</div>
            </div>
        </div>
    )

    return (
        <div
            className="relative py-14 mt-20 w-full h-fit max-md:mt-10 max-md:max-w-full"
            style={{ background: 'linear-gradient(to bottom, #f7faff, #deeefc)' }}>
            <div className="relative text-4xl font-semibold leading-snug text-center text-black">
                Our <span className="text-blue-500">Product</span> Range
            </div>
            <div className="w-full flex justify-center">
                <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
            </div>
            <div className="relative text-xl mt-7  px-[10vw] leading-8 text-center text-zinc-900 max-md:max-w-full">
                At Nessa, we don't just offer off-the-shelf products; we design and manufacture lighting solutions that adapt precisely to your unique
                requirements.
            </div>
            <div className="relative self-stretch mt-16 w-full max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">{categories.map((category, index) => renderCategoryCard(category, index))}</div>
            </div>

            <div className="px-[4vw]">
                <TrendingProductsSwipe />
            </div>
            <div className="w-full flex items-center justify-center">
                <Link
                    to="/allproducts"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 mt-[50px] rounded-lg font-medium transition-colors">
                    View All Products
                </Link>
            </div>
        </div>
    )
}
