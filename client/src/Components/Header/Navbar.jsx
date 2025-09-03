import { CiMail } from 'react-icons/ci'
import { IoCallOutline } from 'react-icons/io5'
import { IoEarthOutline } from 'react-icons/io5'
import { FaCaretDown } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IoMenu, IoClose } from 'react-icons/io5'
import logo from '../../assets/images/nessalogo.webp'
import { MdPermContactCalendar, MdStadium, MdSupportAgent } from 'react-icons/md'
import { GoProjectSymlink } from 'react-icons/go'
import { GrProjects } from 'react-icons/gr'
import { FaGears} from 'react-icons/fa6'
import { AnimatePresence, motion } from 'framer-motion'
import { GrResources } from 'react-icons/gr'
import { allSolutions } from '../../services/api.services'
import toast from 'react-hot-toast'
import { MdInfoOutline } from 'react-icons/md'
import ProductDropdown from './ProductDropdown'
import SearchBar from './SearchBar'

import airport from '../../assets/images/navbar/airport.svg'
import mines from '../../assets/images/navbar/mines.svg'
import stadium from '../../assets/images/navbar/stadium.svg'
import petrol from '../../assets/images/navbar/petrol.svg'
import refinery from '../../assets/images/navbar/refinery.svg'
import highway from '../../assets/images/navbar/highway.svg'
import tunnel from '../../assets/images/navbar/tunnel.svg'
import rural from '../../assets/images/navbar/rural.svg'
import port from '../../assets/images/navbar/port.svg'
import hazardous from '../../assets/images/navbar/Hazardous.svg'
import thermal from '../../assets/images/navbar/thermal.svg'
import solar from '../../assets/images/navbar/solar.svg'
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [soluitonOpen, setsoluitonOpen] = useState(false)
    const [corporateOpen, setcorporateOpen] = useState(false)
    const [productOpen, setproductOpen] = useState(false)
    const [calculatorOpen, setCalculatorOpen] = useState(false)
    const [solutionsDropdown, setSolutionsDropdown] = useState([
    {
        logo: <img loading="lazy" src={airport} alt="Airport" className="w-[40px] h-[40px] " />,
        link: '',
        subcategories: 'Airports'
    },
    {
        logo: <img loading="lazy" src={mines} alt="Mines" className="w-[40px] h-[40px] " />,
        link: '',
        subcategories: 'Mines'
    },
    {
        logo: <img loading="lazy" src={stadium} alt="Stadium" className="w-[40px] h-[40px] " />,
        link: '',
        subcategories: 'Stadium'
    },
    {
        logo: <img loading="lazy" src={petrol} alt="Petrol Pump" className="w-[40px] h-[40px] " />,
        link: '',
        subcategories: 'Petrol pump'
    },
    {
        logo: <img loading="lazy" src={refinery} alt="Refinery" className="w-[40px] h-[40px] " />,
        link: '',
        subcategories: 'Refinery'
    },
    {
        logo: <img loading="lazy" src={highway} alt="Highways" className="w-[40px] h-[40px] " />,
        link: '',
        subcategories: 'Highways'
    },
    {
        logo: <img loading="lazy" src={tunnel} alt="Tunnels" className="w-[40px] h-[40px] " />,
        link: '',
        subcategories: 'Tunnels'
    },
    {
        logo: <img loading="lazy" src={rural} alt="Rural" className="w-[40px] h-[40px] " />,
        link: '',
        subcategories: 'Rural, hilly & forest areas'
    },
    {
        logo: <img loading="lazy" src={port} alt="Ports" className="w-[40px] h-[40px] " />,
        link: '',
        subcategories: 'Ports & logistic parks'
    },
    {
        logo: <img loading="lazy" src={hazardous} alt="Hazardous" className="w-[40px] h-[40px] " />,
        link: '',
        subcategories: 'Hazardous areas'
    },
    {
        logo: <img loading="lazy" src={thermal} alt="Thermal" className="w-[40px] h-[40px] " />,
        link: '',
        subcategories: 'Thermal power plants'
    },
    {
        logo: <img loading="lazy" src={solar} alt="Solar" className="w-[40px] h-[40px] " />,
        link: '',
        subcategories: 'Solar parks'
    }
]) 

    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                setloading(true)
                const response = await allSolutions()
                if (response?.data) {
                    setSolutionsDropdown((prevDropdown) => {
                        return prevDropdown.map((item) => {
                            const matchingSolution = response.data.find((solution) => solution.subcategories === item.subcategories)
                            return {
                                ...item,
                                link: matchingSolution ? `/solutions/${matchingSolution.subcategories.replace(/\s+/g, '-')}/${matchingSolution._id}` : ''
                            }
                        })
                    })
                }
            } catch (error) {
                toast.error('Failed to load solutions')
            } finally {
                setloading(false)
            }
        }

        fetchSolutions()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (isMenuOpen) {
                setIsMenuOpen(false)
            }
            if (soluitonOpen) {
                setsoluitonOpen(false)
            }
            if (corporateOpen) {
                setcorporateOpen(false)
            }
            if (calculatorOpen) {
                setCalculatorOpen(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isMenuOpen, soluitonOpen, corporateOpen, calculatorOpen])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        setsoluitonOpen(false)
        setcorporateOpen(false)
        setproductOpen(false)
        setCalculatorOpen(false)
    }

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.2,
                ease: 'easeOut'
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: {
                duration: 0.2,
                ease: 'easeIn'
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.2
            }
        })
    }

    const handleSolutionClick = (e, link) => {
        if (!link) {
            e.preventDefault()
            toast.error('Data not available for this solution')
        }
    }

    const CorporateDropdown = [
        {
            logo: <GrResources className={`text-[#0074E0]  bg-[#0074E0] bg-opacity-30 w-[35px] h-[35px] rounded-full p-2`} />,
            link: '/resources',
            title: 'Resources'
        },
        {
            logo: <FaGears className={`text-[#FF881B]  bg-[#FF881B] bg-opacity-30 w-[35px] h-[35px] rounded-full p-2`} />,
            link: '/valueAddedServices',
            title: 'Value Added Services'
        },
        {
            logo: <MdPermContactCalendar className={`text-[#0F00E0]  bg-[#0F00E0] bg-opacity-30 w-[35px] h-[35px] rounded-full p-2`} />,
            link: '/contactUs',
            title: 'Contact Us'
        },
        {
            logo: <MdSupportAgent className={`text-[#EF2D28]  bg-[#EF2D28] bg-opacity-30 w-[35px] h-[35px] rounded-full p-2`} />,
            link: '/support',
            title: 'Support'
        },
        {
            logo: <MdInfoOutline className={`text-[#212121]  bg-[#212121] bg-opacity-30 w-[35px] h-[35px] rounded-full p-2`} />,
            link: '/aboutus',
            title: 'About Us'
        },
        {
            logo: <GrProjects className={`text-[#55cb53]  bg-[#55cb53] bg-opacity-30 w-[35px] h-[35px] rounded-full p-2`} />,
            link: '/projects',
            title: 'Projects'
        }
    ]

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
        )
    }

    return (
        <div className="w-screen  text-xl">
            <div className="bg-[var(--primary-bg-color)] p-4 px-[3vw] w-screen">
                <div className="mx-auto flex justify-between items-center">
                    <div className="flex max-lg:hidden gap-4 items-center">
                        <div className="flex items-center">
                            <CiMail className="w-5 h-5 text-white" />
                            <Link
                                to="mailto:info@nessa.in"
                                className="hover:underline text-white ml-2">
                                info@nessa.in
                            </Link>
                        </div>
                        <div className="flex items-center ml-4">
                            <IoCallOutline className="w-5 h-5 text-white" />
                            <span className="text-white ml-2">+918690779778</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <SearchBar />

                        <div className="flex items-center ml-4">
                            <IoEarthOutline className="w-5 h-5 text-white" />
                            <span className="text-white ml-2">IN(ENG)</span>
                            <FaCaretDown className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 px-[3vw] w-screen z-[999] relative">
                <div className="mx-auto flex justify-between items-center">
                    <Link
                        to="/"
                        className="flex items-center">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-[80px] w-[200px] object-contain"
                        />
                    </Link>

                    <div className="hidden xl:flex gap-[4vw] px-[30px] items-center">
                        <Link
                            to="/"
                            className="text-black">
                            Home
                        </Link>
                        <div
                            onMouseEnter={() => {
                                setsoluitonOpen(true)
                                setcorporateOpen(false)
                            }}
                            onMouseLeave={() => {
                                setsoluitonOpen(false)
                                setcorporateOpen(false)
                            }}
                            className="text-black flex items-center gap-1 relative">
                            <div className=" w-full justify-between  flex items-center gap-1 cursor-pointer">
                                <Link
                                    to="/solutions"
                                    className="">
                                    Solutions
                                </Link>
                                <motion.div
                                    animate={{ rotate: soluitonOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}>
                                    <IoIosArrowDown className="w-5 h-5 text-black " />
                                </motion.div>
                            </div>
                            <AnimatePresence>
                                {soluitonOpen && (
                                    <motion.div
                                        variants={dropdownVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="w-[600px] shadow-2xl grid grid-cols-2 text-base rounded-xl bg-white p-[30px] absolute top-[100%] left-[-100%] z-[99]">
                                        {solutionsDropdown.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                custom={index}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible">
                                                <Link
                                                    to={item.link}
                                                    onClick={(e) => handleSolutionClick(e, item.link)}
                                                    className="w-[300px]">
                                                    <div className="flex w-full gap-[10px] mb-2 items-center hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                                        <div className="flex items-center justify-center text-3xl">{item.logo}</div>
                                                        <h1>{item.subcategories}</h1>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <ProductDropdown
                            setIsMenuOpen={setIsMenuOpen}
                            productOpen={productOpen}
                            setproductOpen={setproductOpen}
                        />
                        <div
                            onMouseEnter={() => {
                                setcorporateOpen(true)
                                setsoluitonOpen(false)
                            }}
                            onMouseLeave={() => {
                                setcorporateOpen(false)
                                setsoluitonOpen(false)
                            }}
                            className="text-black flex items-center gap-1 relative cursor-pointer">
                            Corporates
                            <motion.div
                                animate={{ rotate: corporateOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}>
                                <IoIosArrowDown className="w-5 h-5 text-black" />
                            </motion.div>
                            <AnimatePresence>
                                {corporateOpen && (
                                    <motion.div
                                        variants={dropdownVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="w-[300px] shadow-2xl  text-base rounded-xl bg-white p-[30px] absolute top-[120%] left-[-50%] z-[99]">
                                        {CorporateDropdown.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                custom={index}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible">
                                                <Link
                                                    to={item.link}
                                                    className="w-[300px]">
                                                    <div className="flex w-full gap-[10px] mb-2 items-center hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                                        <div className="flex items-center justify-center text-3xl">{item.logo}</div>
                                                        <h1>{item.title}</h1>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div
                            onMouseEnter={() => {
                                setCalculatorOpen(true)
                                setcorporateOpen(false)
                                setsoluitonOpen(false)
                            }}
                            onMouseLeave={() => {
                                setCalculatorOpen(false)
                            }}
                            className="text-black flex items-center gap-1 relative cursor-pointer">
                            Calculators
                            <motion.div
                                animate={{ rotate: calculatorOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}>
                                <IoIosArrowDown className="w-5 h-5 text-black" />
                            </motion.div>
                            <AnimatePresence>
                                {calculatorOpen && (
                                    <motion.div
                                        variants={dropdownVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="w-[300px] shadow-2xl text-base rounded-xl bg-white p-[30px] absolute top-[120%] left-[-50%] z-[99]">
                                        <motion.div
                                            custom={0}
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible">
                                            <Link to="/calculator/battery_AH_calculator" className="w-[300px]">
                                                <div className="flex w-full gap-[10px] mb-2 items-center hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                                    {/* <div className="flex items-center justify-center text-3xl">
                                                        <FaGears className="text-[#FF881B] bg-[#FF881B] bg-opacity-30 w-[35px] h-[35px] rounded-full p-2" />
                                                    </div> */}
                                                    <h1>Battery AH Calculator</h1>
                                                </div>
                                            </Link>
                                        </motion.div>
                                        {/* <motion.div
                                            custom={1}
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible">
                                            <Link to="/calculator/solar-payback" className="w-[300px]">
                                                <div className="flex w-full gap-[10px] mb-2 items-center hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                                   
                                                    <h1>Solar vs. AC Lights Payback Calculator</h1>
                                                </div>
                                            </Link>
                                        </motion.div> */}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        
                    </div>

                    <div className="xl:hidden flex items-center gap-4">
                        <button
                            onClick={toggleMenu}
                            className="text-black p-2 z-50">
                            {isMenuOpen ? <IoClose className="w-8 h-8" /> : <IoMenu className="w-8 h-8" />}
                        </button>
                    </div>

                    <Link
                        to="/contactus"
                        className="bg-[var(--primary-bg-color)] text-white px-4 py-2 rounded ml-8 max-sm:hidden">
                        Contact us
                    </Link>
                </div>

                <div
                    className={`xl:hidden fixed top-[132px] left-0 w-full  max-xl:max-h-[80vh] overflow-y-auto bg-white shadow-lg transition-all duration-300 ease-in-out transform ${
                        isMenuOpen ? 'translate-y-0 opacity-100 visible' : 'translate-y-[-100%] opacity-0 invisible'
                    } z-40`}>
                    <div className="flex flex-col p-4">
                        <Link
                            to="/"
                            className="py-2 text-black hover:bg-gray-100 px-4">
                            Home
                        </Link>
                        <div className="text-black relative">
                            <div
                                onClick={() => {
                                    setsoluitonOpen(!soluitonOpen)
                                }}
                                className=" w-full justify-between px-4 py-2 flex items-center gap-1 cursor-pointer">
                                <Link
                                    to="/solutions"
                                    className="">
                                    {' '}
                                    Solutions
                                </Link>
                                <motion.div
                                    animate={{ rotate: soluitonOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}>
                                    <IoIosArrowDown className="w-5 h-5 text-black " />
                                </motion.div>
                            </div>
                            <AnimatePresence>
                                {soluitonOpen && (
                                    <motion.div
                                        variants={dropdownVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="w-full  grid grid-cols-2 text-base rounded-xl bg-white px-[30px] max-sm:px-0   ">
                                        {solutionsDropdown.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                custom={index}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible">
                                                <Link
                                                    to={item.link}
                                                    onClick={(e) => handleSolutionClick(e, item.link)}
                                                    className="w-[300px]">
                                                    <div className="flex w-full gap-[10px] mb-2 items-center hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                                        <div className="flex items-center justify-center text-3xl">{item.logo}</div>
                                                        <h1>{item.subcategories}</h1>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <ProductDropdown
                            setIsMenuOpen={setIsMenuOpen}
                            productOpen={productOpen}
                            setproductOpen={setproductOpen}
                        />
                        <div className="text-black relative">
                            <div
                                onClick={() => {
                                    setcorporateOpen(!corporateOpen)
                                }}
                                className=" w-full justify-between px-4 py-2 flex items-center gap-1 cursor-pointer">
                                <div className="">Corporates</div>
                                <motion.div
                                    animate={{ rotate: corporateOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}>
                                    <IoIosArrowDown className="w-5 h-5 text-black cursor-pointer" />
                                </motion.div>
                            </div>
                            <AnimatePresence>
                                {corporateOpen && (
                                    <motion.div
                                        variants={dropdownVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="w-full  grid grid-cols-2 text-base rounded-xl bg-white px-[30px] max-sm:px-0   ">
                                        {CorporateDropdown.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                custom={index}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible">
                                                <Link
                                                    to={item.link}
                                                    className="w-[300px]">
                                                    <div className="flex w-full gap-[10px] mb-2 items-center hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                                        <div className="flex items-center justify-center text-3xl">{item.logo}</div>
                                                        <h1>{item.title}</h1>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="text-black relative">
                            <div
                                onClick={() => {
                                    setCalculatorOpen(!calculatorOpen)
                                }}
                                className="w-full justify-between px-4 py-2 flex items-center gap-1 cursor-pointer">
                                <div className="">Calculators</div>
                                <motion.div
                                    animate={{ rotate: calculatorOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}>
                                    <IoIosArrowDown className="w-5 h-5 text-black cursor-pointer" />
                                </motion.div>
                            </div>
                            <AnimatePresence>
                                {calculatorOpen && (
                                    <motion.div
                                        variants={dropdownVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="w-full text-base rounded-xl bg-white px-[30px] max-sm:px-0">
                                        <motion.div
                                            custom={0}
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible">
                                            <Link to="/calculator/battery_AH_calculator" className="w-[300px]">
                                                <div className="flex w-full gap-[10px] mb-2 items-center hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                                    {/* <div className="flex items-center justify-center text-3xl">
                                                        <FaGears className="text-[#FF881B] bg-[#FF881B] bg-opacity-30 w-[35px] h-[35px] rounded-full p-2" />
                                                    </div> */}
                                                    <h1>Battery AH Calculator</h1>
                                                </div>
                                            </Link>
                                        </motion.div>
                                        {/* <motion.div
                                            custom={1}
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible">
                                            <Link to="/calculator/solar-payback" className="w-[300px]">
                                                <div className="flex w-full gap-[10px] mb-2 items-center hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                                                    
                                                    <h1>Solar vs. AC Lights Payback Calculator</h1>
                                                </div>
                                            </Link>
                                        </motion.div> */}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            to="/contactus"
                            className="sm:hidden py-2 text-black hover:bg-gray-100 px-4">
                            Contact us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
