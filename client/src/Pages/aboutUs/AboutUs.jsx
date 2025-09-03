import { nessaEdgeItems, whoWeAre } from './AboutUsConfig'
import { RiLightbulbFlashLine } from 'react-icons/ri'
import ProductAndTestingSwiper from './ProductAndTestingSwiper'
import CertificatesSwiper from './CertificatesSwiper'
import hero from '../../assets/images/aboutUs/Aboutushero.jpg'
import ourVision from '../../assets/images/aboutUs/ourVision.png'
import ourMission from '../../assets/images/aboutUs/ourMission.png'
import customersegment from '../../assets/images/aboutUs/customersegment.svg'
import Navbar from '../../Components/Header/Navbar'
import SideComponent from '../../Components/sideComponent/SideComponent'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import PartnersReviewsSwiper from '../../Components/partnerreviews/PartnersReviewsSwiper'
import Footer from '../../Components/Footer'
import TeamSwiper from './TeamSwiper'
import InvestorSwiper from './InvestorSwiper'

const AboutUs = () => {

    const whyChooseNessaBoxData = [
        {
            title: '16+ Years of Expertise',
            description: 'Every Nessa product is designed and manufactured at our state-of-the-art facility in Ahmedabad, spanning 17,000 sq. ft.'
        },
        {
            title: 'Dedicated R&D Hub',
            description: 'Our in-house Nessa Technology & Innovation Centre in Ahmedabad is the engine of our progress.'
        },
        {
            title: 'Trusted by PSUs and Beyond',
            description:
                'Recognized and approved by numerous Public Sector Undertakings (PSUs) across India, our products reflect trust, durability, and quality.'
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
                <div className="border-2 h-full border-blue-500 bg-white w-full rounded-2xl p-6 shadow-md">
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


    return (
        <div className="w-full overflow-hidden">
            <Navbar />
            <SideComponent />

            <div className="w-full h-[300px] max-sm:h-[200px] relative flex items-center  justify-start ">
                <img
                    loading="lazy"
                    className="w-full min-h-[150px] object-cover object-left absolute "
                    src={hero}
                    alt=""
                />
                {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold w-full text-center text-white ml-[5vw] relative z-[2] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                    About Us
                </h1> */}
            </div>

            <div className="w-full min-h-[300px] relative py-[50px] px-[5vw]">
                <div className="absolute w-[250px] h-[250px] bg-[var(--light-blue)] opacity-30 left-[-7vw] top-[-3vw]   rounded-full z-[-1]"></div>

                <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Lighting the Future: About Nessa <br />
                    <span className="text-blue-500"> Illumination</span> Technologies
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>
                <div className="relative mt-7 text-xl px-[5vw] mb-4 leading-8 text-center text-zinc-900 max-md:max-w-full">
                    Brightening lives with innovative, sustainable, and efficient lighting solutions.
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
                className=" w-full "
                style={{ background: 'linear-gradient(to bottom, #f7faff, #deeefc)' }}>
                <div className="w-full min-h-[300px] relative py-[50px] px-[5vw]">
                    <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                        About
                        <span className="text-blue-500"> US</span>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                    </div>
                    <div className="relative mt-7 text-xl px-[5vw] mb-4 leading-8 text-justify text-zinc-900 max-md:max-w-full">
                        Nessa Illumination Technologies Private Limited is a leader in the LED lighting industry, renowned for its expertise in
                        delivering advanced technical lighting solutions. Our <strong>state-of-the-art technology</strong> is developed at the
                        in-house <strong>NESSA Technology & Innovation Centre (R&D Centre)</strong> in Ahmedabad.
                        Our products have received approvals from multiple <strong>Public Sector Units (PSUs) across India</strong>, underscoring our
                        commitment to <strong>quality and innovation</strong>. Nessa’s luminaires are meticulously designed and manufactured in our{' '}
                        <strong>ultra-modern production facilities</strong>, ensuring the highest standards of excellence.
                    </div>
                    <div className="relative mt-7 text-xl px-[5vw] mb-4 leading-8 text-justify text-zinc-900 max-md:max-w-full">
                        We are rapidly establishing our presence in the LED industry with our <strong>cutting-edge lighting solutions</strong>. Our
                        professional lighting portfolio spans{' '}
                        <strong>indoor, street, industrial, landscape, and architectural lighting applications</strong>. We also provide{' '}
                        <strong>customized LED lighting solutions</strong> for various fixtures, tailored to meet diverse requirements.
                        With <strong>strategic collaborations</strong> with intelligent system integrators, Nessa has the expertise to{' '}
                        <strong>
                            design advanced illumination systems, implement intelligent lighting installations, and enable remote monitoring and
                            dimming functionalities
                        </strong>
                        .
                    </div>
                    <div className="relative mt-7 text-xl px-[5vw] mb-4 leading-8 text-justify text-zinc-900 max-md:max-w-full">
                        Our latest range of luminaires aligns with the principles of{' '}
                        <strong>"energy conservation," "environmental sustainability," and "enhanced value for money."</strong> At Nessa Illumination
                        Technologies, we believe that{' '}
                        <strong>superior products with innovative technology can create a brighter, more sustainable world</strong>. Our commitment to{' '}
                        <strong>innovation, quality, and sustainability</strong> drives us to continuously enhance our offerings, ensuring we meet the
                        evolving needs of our customers.
                        <strong>Explore our range and experience how Nessa’s smart lighting solutions can transform your environment.</strong>
                    </div>
                </div>
            </div>

            <div className="w-full text-xl flex max-md:flex-col min-h-[200px] relative p-[5vw]">
                <div className="w-1/2  max-md:w-full max-md:h-fit flex flex-col items-center gap-5 p-[30px] text-center ">
                    <img
                        loading="lazy"
                        className="h-[200px]"
                        src={ourVision}
                        alt=""
                    />
                    <h1 className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                        Our
                        <span className="text-blue-500"> Vision</span>
                    </h1>
                    <h1 className="px-[50px]">
                        {' '}
                        To become one of the best and most preferred lighting solution providers in domestic as well as international market.
                    </h1>
                </div>

                <div
                    className="min-h-[100px] w-[2px] max-md:hidden"
                    style={{
                        background: 'linear-gradient(to bottom, transparent, #0074E0, transparent)'
                    }}></div>

                <div className="w-1/2  max-md:w-full max-md:h-fit flex flex-col items-center gap-5 p-[30px] text-center ">
                    <img
                        loading="lazy"
                        className="h-[200px]"
                        src={ourMission}
                        alt=""
                    />
                    <h1 className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                        Our
                        <span className="text-blue-500"> Mission</span>
                    </h1>
                    <h1 className="px-[50px]"> To work as a team innovatively and dedicatedly to create safe & reliable products and services.</h1>
                </div>
            </div>

            <div className="py-[5vw]  ">
                <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Why 
                    <span className="text-blue-500"> NESSA</span>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>
                <div className="relative mt-7 text-xl px-[10vw] mb-4 leading-8 text-center text-zinc-900 max-md:max-w-full">{whoWeAre.para}</div>

                <div className="grid grid-cols-3 justify-items-center max-md:grid-cols-1 gap-4 px-[5vw] py-8">
                    {whyChooseNessaBoxData.map((item, index) => whyChooseNessaBox(item, index))}
                </div>
            </div>

            <div
                className=" w-full py-[50px] "
                style={{ background: 'linear-gradient(to bottom, #f7faff, #deeefc)' }}>
                <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Nessa
                    <span className="text-blue-500"> Edge</span>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>

                <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 px-[5vw] mt-[50px] gap-20 justify-items-center">
                    {nessaEdgeItems.map((item, index) => (
                        <div
                            key={index}
                            className=" flex flex-col items-center gap-5 ">
                            <img
                                loading="lazy"
                                className="w-[80px] h-[80px]"
                                src={item.img}
                                alt=""
                            />
                            <h1 className="text-xl text-center">{item.title}</h1>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full py-[50px]">
                <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Our Team
                    <span className="text-blue-500"> &</span> Advisor
                </div>
                <div className="w-full flex justify-center mb-5">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>

                <TeamSwiper />

                <InvestorSwiper />
            </div>

            <div
                className=" w-full py-[50px] "
                style={{ background: 'linear-gradient(to bottom, #f7faff, #deeefc)' }}>
                <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Customer
                    <span className="text-blue-500"> Segment</span>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>

                <div className="px-[5vw] w-full flex justify-center">
                    <img
                        loading="lazy"
                        className="mt-[50px] "
                        src={customersegment}
                        alt=""
                    />
                </div>
            </div>

            <div className="w-full py-[50px]">
                <div className=" px-[5vw] text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Product
                    <span className="text-blue-500"> & Testing</span> Facilities
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>
                <div className=" px-[5vw] ">
                    <ProductAndTestingSwiper />
                </div>
            </div>
            <div className="w-full py-[50px] px-[5vw]">
                <div className=" px-[5vw] text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    <span className="text-blue-500"> Certification</span>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>
                <CertificatesSwiper />
            </div>

            <div className="w-full px-[5vw] py-[100px] flex max-md:flex-col">
                <div className=" px-[5vw] text-5xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Quality <br />
                    <span className="text-blue-500"> Policy</span>
                </div>
                <div className="min-h-[100px] w-[5px] max-md:hidden bg-blue-500 "></div>
                <div className=" px-[5vw] text-xl flex items-center justify-center text-black z-[2] relative">
                    <h1>
                        {' '}
                        To be World Class supplier of <span className="text-blue-500"> LED Lights, Solar LED Lights and Drivers, </span> which meet
                        the Customer’s expectations through Teamwork and continuous <span className="text-blue-500">Improvement and Innovation.</span>{' '}
                    </h1>
                </div>
            </div>

            <PartnersReviewsSwiper />

            <Footer />
        </div>
    )
}

export default AboutUs
