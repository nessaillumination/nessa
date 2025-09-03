import { Link, Outlet, useLocation } from 'react-router-dom'
import Media from './Media'
import resourceshero from '../../assets/images/resources/resourceshero.jpg'
import Navbar from '../../Components/Header/Navbar'
import SideComponent from '../../Components/sideComponent/SideComponent'
import Footer from '../../Components/Footer'
import { fetchUtilsData } from '../../services/api.services'
import { useEffect, useState } from 'react'
import { resourcesUtilsConfigHardCodedData } from './ResourcesConfig'
import toast from 'react-hot-toast'
import ResourcesInsights from './ResourcesInsights'

export const Resources = () => {
    const [loading, setloading] = useState(true)
    const [nessaCatalogs, setnessaCatalogs] = useState(resourcesUtilsConfigHardCodedData.utilsData.nessaCatalogUtilsData)
    const [productManual, setproductManual] = useState(resourcesUtilsConfigHardCodedData.utilsData.productManualUtilsData)
    const [nessaManual, setnessaManual] = useState(resourcesUtilsConfigHardCodedData.utilsData.nessaManualUtilsData)

    const isNestedRoute = location.pathname.split('/').length > 2

    if (isNestedRoute) {
        return <Outlet />
    }

    return (
        <div className="w-full overflow-hidden">
            <Navbar />
            <SideComponent />

            <div className="w-full h-[300px] max-sm:h-[200px] relative flex items-center  justify-start ">
                <img
                    className="w-full min-h-[150px] object-cover object-left absolute "
                    src={resourceshero}
                    alt=""
                />
                {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white ml-[5vw] relative z-[2] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                    Resources
                </h1> */}
            </div>

            <div className="w-full min-h-[300px] relative py-[50px] px-[5vw]">
                <div className="absolute w-[250px] h-[250px] bg-[var(--light-blue)] opacity-30 left-[-7vw] top-[-3vw]   rounded-full z-[-1]"></div>

                <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    <span className="text-blue-500"> Comprehensive Resource</span> Hub
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>
                <div className="relative mt-7 text-xl px-[5vw] mb-4 leading-8 text-center text-zinc-900 max-md:max-w-full">
                    Explore our comprehensive resource hub to stay informed. For the latest specifications, please confirm with our sales team.
                    Specifications are subject to change without prior notice.
                </div>
            </div>

            <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 w-full justify-items-center mt-[50px] ">
                {nessaCatalogs.map((item, index) => (
                    <div
                        key={index}
                        className=" w-[20vw] max-md:w-[40vw] max-sm:w-[90%] max-md:mb-10 h-[30vw] max-md:h-fit  flex flex-col items-center ">
                        <img
                            loading='lazy'
                            className="bg-gray-400  h-[300px]   "
                            src={item.poster}
                            alt={item.name}
                        />

                        <Link
                            to={item.downloadLink ? item.downloadLink : null}
                            // download
                            target="_blank"
                            className="bg-blue-500 w-full text-center py-[10px] mt-[20px] rounded-md text-white">
                            {item.name}
                        </Link>
                    </div>
                ))}
            </div>

            <div
                style={{
                    background: 'linear-gradient(to bottom, #f7faff, #deeefc)'
                }}
                className="py-[50px] ">
                <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    Product
                    <span className="text-blue-500">  Manuals</span>
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>
                <div className="grid grid-cols-4 max-[1000px]:grid-cols-3  max-md:grid-cols-2 max-sm:grid-cols-1 w-full justify-items-center px-[5vw] mt-[50px] ">
                    {productManual.map((item, index) => (
                        <div
                            key={index}
                            className=" w-[20vw] max-md:w-[40vw] max-sm:w-[90%] max-sm:mb-10 min-h-[30vw] max-md:h-fit mb-[50px]  flex flex-col items-center  justify-between">
                            <img
                                className=" h-[300px] object-cover  "
                                src={item.poster}
                                alt={item.name  + ' poster'}
                                loading='lazy'
                            />

                            <h1 className="text-xl font-semibold mt-4">{item.name}</h1>
                            <p className="text-md text-zinc-900 mt-4 mb-4 text-center">{item.description}</p>

                            <Link
                                to={item.downloadLink ? item.downloadLink : null}
                                target="_blank"
                                className="bg-blue-500 w-[70%] text-center py-[10px] mt-[20px] rounded-md text-white">
                                Download Now
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full  relative py-[50px] px-[5vw]">
                <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                    <span className="text-blue-500"> NESSA </span> Lighting Solutions
                </div>
                <div className="w-full flex justify-center">
                    <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                </div>
            </div>

            <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 w-full justify-items-center   px-[5vw]">
                {nessaManual.map((item, index) => (
                    <div
                        key={index}
                        className=" w-[20vw] max-md:w-[40vw] max-sm:w-[90%] mb-10 max-sm:mb-10 max-md:h-fit  flex flex-col items-center justify-between text-center ">
                        <h1 className="text-xl font-semibold mt-4">{item.name}</h1>
                        {/* <h1 className="text-base font-semibold mt-4">{item.description}</h1> */}

                        <Link
                            to={item.downloadLink ? item.downloadLink : null}
                            download
                            target="_blank"
                            className="bg-blue-500 w-[70%] text-center py-[10px] mt-[20px] rounded-md text-white">
                            Download Now
                        </Link>
                    </div>
                ))}
            </div>

            <ResourcesInsights />
            <Media />

            <Footer />
        </div>
    )
}
