
import { Link } from 'react-router-dom'
import hero from '../../assets/images/solutionsImages/hero.png'
import experties1 from '../../assets/images/solutionsImages/experties1.png'
import experties2 from '../../assets/images/solutionsImages/experties2.png'
import Navbar from '../../Components/Header/Navbar'
import SideComponent from '../../Components/sideComponent/SideComponent'
import { useEffect, useState } from 'react'
import { allSolutions, fetchUtilsData } from '../../services/api.services'
import TrendingProductsSwipe from '../../Components/trendingProducts/TrendingProductsSwiper'
import toast from 'react-hot-toast'
import Footer from '../../Components/Footer'

const Solutions = () => {
    const [loading, setloading] = useState(true)
    const [solutions, setsolutions] = useState([])
    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                setloading(true)

                const response = await allSolutions()
                if (response?.data) {
                    setsolutions(response.data)
                }
            } catch (error) {
                console.error('Error fetching solutions data:', error)
                toast.error('Failed to load solutions')
            } finally {
                setloading(false)
            }
        }

        fetchSolutions()
    }, [])


  
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
        )
    }

    return (
        <div className="w-full  overflow-hidden ">
            <Navbar />
            <SideComponent />
            <div className="w-full h-[300px] max-sm:h-[200px] relative flex items-center  justify-start ">
                <img
                    loading='lazy'
                    className="w-full h-full object-cover  absolute "
                    src={hero}
                    alt=""
                />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white ml-[5vw] relative z-[2] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                    Solutions
                </h1>
            </div>

            <div className="w-full min-h-[300px] relative py-[50px] px-[5vw]">
                <div className="absolute w-[250px] h-[250px] bg-[var(--light-blue)] opacity-30 left-[-7vw] top-[-3vw]   rounded-full z-[-1]"></div>

                <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Lighting Solutions
                    <span className="text-blue-500"> According</span> to <br /> Your Needs & Conditions
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>
                <div className="relative mt-7 text-xl px-[5vw] mb-4 leading-8 text-center text-zinc-900 max-md:max-w-full">
                    At Nessa, we don’t just offer off-the-shelf products; we design and manufacture lighting solutions that adapt precisely to your
                    unique requirements. From extreme environments in mining and refineries to specific needs in airports and rural settings, our
                    expert team customizes each solution to solve the exact challenges you face.
                </div>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 max-sm:grid-cols-1  gap-20 justify-items-center p-[5vw]">
                {solutions.map((solution, index) => (
                    <Link
                        to={`/solutions/${solution.subcategories.replace(/\s+/g, '-')}/${solution._id}`}
                        key={index}
                        className="relative h-[400px]  rounded-md lg:w-[28vw] md:w-[40vw] w-full flex justify-center items-end">
                        <img
                            loading='lazy'
                            className="w-full h-full object-cover  absolute rounded-md"
                            src={solution.thumbnail}
                            alt=""
                        />
                        <h1 className="rounded-md w-[95%] bg-white text-xl py-[10px] mb-[10px] flex items-center justify-center relative z-[2]">
                            {solution.subcategories}
                        </h1>
                    </Link>
                ))}
            </div>

            <div className="w-full mt-[100px] bg-[#F4F9FE] flex max-md:flex-col items-center justify-center gap-20 px-[5vw] relative ">
                <div className="absolute left-0 bottom-0 max-md:top-0 w-[40%] h-[150px] bg-blue-500"></div>
                <div className="w-1/2 max-md:w-full h-full relative">
                    <img
                        loading='lazy'
                        className="w-full h-[400px] object-cover"
                        src={experties1}
                        alt=""
                    />
                </div>

                <div className="w-1/2 max-md:w-full h-full  ">
                    <h1 className="text-2xl font-semibold">Custom Lighting for Harsh Environments</h1>
                    <br />
                    <p className="text-xl">
                        From the blazing heat of refineries to the damp, rugged conditions of mines, Nessa’s customized lighting solutions are built
                        to perform.{' '}
                    </p>
                    <br />
                    <p className="text-xl">
                        Our products are designed with durability and efficiency in mind, ensuring reliable performance even in the harshest
                        environments.
                    </p>
                </div>
            </div>

            <div className="w-full mt-[100px] bg-[#F4F9FE] flex max-md:flex-col items-center justify-center gap-20 px-[5vw]  relative">
                <div className="w-1/2 max-md:w-full h-full ">
                    <h1 className="text-2xl font-semibold">Solutions Tailored to Your Needs</h1>
                    <br />
                    <p className="text-xl">
                        Whether it’s optimizing brightness for airports or creating energy-efficient systems for highways, our expert team works
                        closely with you to craft solutions tailored to your exact specifications.
                    </p>
                    <br />
                    <p className="text-xl">
                        With Nessa, you don’t just get products—you get precision-engineered solutions that solve your unique problems.
                    </p>
                </div>
                <div className="absolute right-0 bottom-0 w-[40%] h-[150px] bg-blue-500"></div>
                <div className="w-1/2 max-md:w-full h-full relative">
                    <img
                        loading='lazy'
                        className="w-full h-[400px] object-cover"
                        src={experties2}
                        alt=""
                    />
                </div>
            </div>

            <div className="py-[20px] px-[4vw] my-[20px] w-full">
                <div className=" text-4xl mt-[50px] font-semibold leading-snug text-center text-black z-[2] relative">
                    Trending
                    <span className="text-blue-500"> Products</span>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>
            </div>

            <div className="px-[4vw] mb-10 ">
                <TrendingProductsSwipe />
            </div>

            <Footer />
        </div>
    )
}

export default Solutions


