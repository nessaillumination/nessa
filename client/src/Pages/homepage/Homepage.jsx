import { countries} from './homepageConfig';
import { Link } from 'react-router-dom';
import { ProductRange } from './homepageinnersections/ProductRange';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import RecognizeEx from './homepageinnersections/RecognizeEx';
import InsitesSwiper from './homepageinnersections/InsitesSwiper'
import herobg from '../../assets/images/homepageimages/herobg2.webp';
import thunder from '../../assets/images/homepageimages/thunder.svg';
import lamp from '../../assets/images/homepageimages/lamp.png';
import indiaMap from '../../assets/images/homepageimages/indiaMap.png';
import indiaFlag from '../../assets/images/homepageimages/india.png';
import Navbar from '../../Components/Header/Navbar';
import SideComponent from '../../Components/sideComponent/SideComponent';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { allSolutions } from '../../services/api.services';
import Footer from '../../Components/Footer';
import Marque from './homepageinnersections/Marque';
import ImageSection from './homepageinnersections/ImageSection';
import PartnersReviewsSwiper from '../../Components/partnerreviews/PartnersReviewsSwiper';


const Homepage = () => {
    const [loading, setloading] = useState(true)
    const [solutions, setsolutions] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            window.dispatchEvent(new CustomEvent('openSidebar'))
        }, 2000)

        return () => clearTimeout(timer) 
    }, []) 

    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                setloading(true)

                const response = await allSolutions()
                if (response?.data) {
                    setsolutions(response.data.slice(0, 4))
                }
            } catch (error) {
                console.error('Error fetching product data:', error)
                toast.error('Failed to load products')
            } finally {
                setloading(false)
            }
        }

        fetchSolutions()
    }, [])

    const whyChooseNessaBoxData = [
        {
            title: '16+ Years of Expertise',
            description: 'Lighting the way for over 16 years, trusted by industries worldwide.'
        },
        {
            title: 'Global Reach',
            description: 'Serving clients in 20+ countries across all major continents.'
        },
        {
            title: 'Inhouse Manufacturing',
            description: 'Complete control from design to delivery for unmatched quality.'
        }
    ]

    const [hover, sethover] = useState('')

    const whyChooseNessaBox = (item, index) => {
        return (
            <div
                key={index}
                onMouseEnter={() => sethover(index)}
                onMouseLeave={() => sethover('')}
                className="w-[22vw] pt-[20px] rounded-2xl shadow-md max-md:w-full relative overflow-hidden cursor-pointer"
                style={{
                    background: 'linear-gradient(to right, #841D84, #3DC3BB, #FF8983)'
                }}>
                <AnimatePresence>
                    {hover === index && (
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{
                                duration: 0.3,
                                ease: 'easeInOut'
                            }}
                            className="absolute inset-0 rounded-2xl bg-blue-500"
                        />
                    )}
                </AnimatePresence>
                <div className="border-2 border-blue-500 bg-white w-full h-full rounded-2xl p-6 shadow-md">
                    <div className="flex items-center mb-4 relative z-[2]">
                        <RiLightbulbFlashLine className={`text-4xl  ${hover === index ? 'text-white ' : 'text-blue-500'}`} />
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 relative z-[2]  ${hover === index ? 'text-white ' : 'text-blue-500'} `}>
                        {item.title}
                    </h3>
                    <p className={`relative z-[2]  ${hover === index ? 'text-white ' : 'text-black'}`}>{item.description}</p>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
        )
    }

    return (
        <div className="w-full  overflow-hidden">
            <Navbar />
            <SideComponent />

            <div className="w-full h-[70vh] relative bg-cover bg-center" style={{ backgroundImage: `url(${herobg})` }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-black px-4">
                    <div className="max-w-4xl mx-auto text-center ">
                        <div className="w-full flex items-center justify-center">
                            <div className="flex w-fit  px-[30px] max-md:px-[10px] py-[5px] items-center justify-center gap-2  border border-[var(--primary-bg-color)] rounded-full">
                                <img
                                    className=""
                                    src={thunder}
                                    alt=""
                                    loading='lazy'
                                />
                                <span className="text-lg font-medium">Crafted with precision, powered by sustainability</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 mt-8">
                            Innovative <span className="text-blue-500">Lighting Solutions</span>
                           
                        </h1>

                        <p className="text-lg md:text-xl  mb-8 max-w-2xl mx-auto">
                            With 16+ years of expertise and a global presence in 20+ countries, Nessa delivers sustainable, high-performance lighting
                            tailored to your needs.
                        </p>

                        <Link
                            to="solutions"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            Discover All Solutions
                        </Link>
                    </div>
                </div>
            </div>

            <ImageSection />

            <Marque />

            <div className="w-full py-16 max-md:pb-2 px-[5vw] bg-white text-center">
                <h2 className="text-4xl font-semibold ">
                    Lighting <span className="text-blue-500">Solutions</span> According to <br />
                    Your Needs & Conditions
                </h2>
                <div className="w-full flex justify-center mb-4">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>

                <p className="text-xl px-[5vw] mb-8">
                    At Nessa, we don't just offer off-the-shelf products; we design and manufacture lighting solutions that adapt precisely to your
                    unique requirements. From extreme environments in mining and refineries to specific needs in airports and rural settings, our
                    expert team customizes each solution to solve the exact challenges you face.
                </p>
            </div>

            {solutions.map((solution, index) => (
                <div
                    key={index}
                    className={`w-full py-16  max-md:pb-2 px-[5vw] bg-white text-center  relative `}>
                    <div
                        className={`flex flex-col  md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} items-center justify-center gap-8 z-[2] relative`}>
                        <img
                            className="w-full md:w-1/2 h-[350px] object-cover rounded-lg shadow-lg z-[2]"
                            loading='lazy'
                            src={solution.thumbnail}
                            alt={solution.subcategories}
                        />
                        <div className="text-left md:w-1/2 ">
                            <h3 className="text-2xl font-bold mb-2">{solution.subcategories}</h3>
                            <p className="mb-4">{solution.description}</p>

                            <Link
                                to={`/solutions/${solution.subcategories.replace(/\s+/g, '-')}/${solution._id}`}
                                className="border border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors">
                                Discover Solution
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <div className="w-full mt-5 flex items-center justify-center">
                <Link
                    to="solutions"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                    Discover All Solutions
                </Link>
            </div>

            <ProductRange />

            <div className="w-full h-fit px-[5vw] py-[5vw] flex flex-col items-center justify-center relative">
                <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Trusted by
                    <span className="text-blue-500"> Industries</span> Across <br /> the Globe{' '}
                </div>
                <div className="flex relative shrink-0 mt-9 h-2.5 bg-[var(--light-blue)] rounded-[50px] w-[51px]" />
                <div className="relative mt-7 text-xl px-[5vw] leading-8 text-center text-zinc-900 max-md:max-w-full">
                    With a growing presence across 20+ countries, Nessa is internationally recognized for the reliability, integrity, and high
                    standards of its products. From Africa and the Middle East to Europe, South Asia, and the USA, our lighting solutions serve a
                    trusted customer base, expanding our reach every year and delivering excellence across major continents.
                </div>
                <div className="absolute w-[15vw] min-w-[80px] object-cover top-0 right-10 max-sm:right-0">
                    {' '}
                    <img
                        src={lamp}
                        alt=""
                        loading='lazy'
                    />
                </div>
            </div>
            <div className="flex max-md:block px-[5vw] text-lg relative">
                <div className="w-[60%] max-md:w-full h-[500px] max-md:h-fit max-md:mb-[50px] ">
                    <h1 className="text-center mb-8">Nationwide presence</h1>
                    <div className="flex max-md:flex-col">
                        <img
                            className=" h-[350px] w-[60%] max-md:w-full object-contain"
                            src={indiaMap}
                            alt=""
                            loading='lazy'
                        />
                        <div className="w-[40%]  flex  max-md:w-full max-md:mt-10 flex-col items-center justify-center ">
                            <img
                                className="w-[80px] h-[80px]"
                                src={indiaFlag}
                                alt=""
                                loading='lazy'
                            />
                            <div className="relative text-lg font-semibold  text-center text-black">
                                Nessa in <br />
                                <span className="text-blue-500"> 29 States</span> of india <br />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[40%] max-md:w-full h-[500px] max-md:h-fit relative">
                    <div
                        className="h-[80%] mt-[10%] max-md:mt-0 absolute left-0 w-[2px] max-md:w-full max-md:h-[2px] bg-blue-500"
                        style={
                            {
                                // background: 'linear-gradient(to bottom, transparent, #0074E0, transparent)'
                            }
                        }></div>

                    <h1 className="text-center mb-8 pt-[20px]">International presence</h1>
                    <div className="grid grid-cols-4 gap-y-4 gap-x-0 ml-5 max-sm:ml-0">
                        {countries.map((country, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center ">
                                <img
                                    className="h-[50px] w-[50px]  "
                                    src={country.flag}
                                    alt=""
                                    loading='lazy'
                                />
                                <h1 className="text-center">{country.country}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="py-[50px] "
                style={{ background: 'linear-gradient(to bottom, #f7faff, #deeefc)' }}>
                <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Why Choose
                    <span className="text-blue-500"> Nessa</span>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>
                <div className="relative mt-7 text-xl px-[5vw] mb-4 leading-8 text-center text-zinc-900 max-md:max-w-full">
                    Trusted by industries worldwide, Nessa delivers customized, high-performance lighting solutions for every need. Partner with Nessa
                    for reliable, energy-efficient lighting that sets new standards in quality and sustainability.
                </div>
                <div>
                    <div className="grid grid-cols-3 justify-items-center max-md:grid-cols-1 gap-4 px-[5vw] py-8">
                        {whyChooseNessaBoxData.map((item, index) => whyChooseNessaBox(item, index))}
                    </div>
                </div>
            </div>

            <div className="w-full h-fit px-[5vw] py-[5vw] flex flex-col items-center justify-center relative">
                <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Inside
                    <span className="text-blue-500"> Nessa:</span> Expertise <br /> in Every Step
                </div>
                <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                <div className="relative mt-7 text-xl px-[5vw] leading-8 text-center text-zinc-900 max-md:max-w-full">
                    With complete in-house manufacturing, R&D, and stringent testing, Nessa guarantees top-tier quality and innovation in every
                    lighting solution. From design to delivery, we control every step for unmatched reliability.
                </div>
                <div className="absolute z-[1] w-[15vw] min-w-[80px]  object-cover top-0 left-10 max-sm:left-0">
                    {' '}
                    <img
                        src={lamp}
                        alt=""
                        loading='lazy'
                    />
                </div>
            </div>
            <div className="w-full h-fit px-[5vw] pb-[50px]">
                <div
                    className="relative w-full"
                    style={{ paddingTop: '56.25%' }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                        src="https://www.youtube.com/embed/U6f9QtHyel8?autoplay=1&mute=1&controls=1&cc_load_policy=0&loop=1&playlist=U6f9QtHyel8&rel=0"
                        title="YouTube video player"
                        loading="lazy"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>
                </div>
            </div>
            <div
                className=""
                style={{ background: 'linear-gradient(to bottom, #f7faff, #deeefc)' }}>
                <PartnersReviewsSwiper />
            </div>

            <RecognizeEx />

            <div
                className="py-[50px]  mt-[50px] max-md:mt-0"
                style={{ background: 'linear-gradient(to bottom, #f7faff, #deeefc)' }}>
                <div className=" text-4xl pb-[50px] font-semibold leading-snug text-center text-black z-[2] relative">
                    Insights &<span className="text-blue-500"> Resources</span>
                </div>
                <InsitesSwiper />
            </div>

            <Footer />
        </div>
    )
}

export default Homepage
