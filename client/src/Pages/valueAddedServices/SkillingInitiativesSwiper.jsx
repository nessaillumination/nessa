import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

const skillingInitiatives = [
    {
        id: 1,
        content: (
            <>
                <h2 className="text-2xl font-bold mb-4">1. Project Sankalp (Govt. of Gujarat)</h2>
                <p className="mb-4 text-xl">
                    Nessa is an <strong>empanelled Training Partner</strong> for <strong>Project Sankalp</strong>, an{' '}
                    <strong>industry-led training initiative</strong> by the <strong>Government of Gujarat</strong>. Our{' '}
                    <strong>training center</strong> is fully accredited as per the <strong>Centre Accreditation Standards</strong> set by the
                    government.
                </p>
                <p className="mb-4 text-xl">
                    Currently, we offer the following <strong>NSDC-affiliated courses</strong> at our training facility:
                </p>
                <div className="mb-4 text-xl">
                    <p className="flex items-center mb-2">
                        <span className="w-[8px] h-[8px] rounded-full bg-black mx-[20px]"></span>
                        <strong>LED Light Repair Technician</strong> (ELE/Q9302)
                    </p>
                    <p className="flex items-center mb-2">
                        <span className="w-[8px] h-[8px] rounded-full bg-black mx-[20px]"></span>
                        <strong>Solar LED Technician</strong> (ELE/Q5903)
                    </p>
                    <p className="flex items-center mb-2">
                        <span className="w-[8px] h-[8px] rounded-full bg-black mx-[20px]"></span>
                        <strong>Solar Panel Installation Technician</strong> (ELE/Q5901)
                    </p>
                </div>
                <p className="mb-4 text-xl">
                    For more details on <strong>Project Sankalp</strong>, visit:{' '}
                    <a
                        href="https://skills.gujarat.gov.in"
                        target='_blank'
                        className="text-blue-500">
                        https://skills.gujarat.gov.in
                    </a>
                </p>
                <a
                    href="https://www.nessa.in"
                    target='_blank'
                    className="text-xl text-blue-500 flex items-center">
                    <span className="mr-2">🌐</span>
                    www.nessa.in
                </a>
            </>
        )
    },
    {
        id: 2,
        content: (
            <>
                <h2 className="text-2xl font-bold mb-4">2. National Apprenticeship Promotion Scheme (NAPS)</h2>
                <p className="mb-4 text-xl">
                    Nessa is an <strong>empanelled Third-Party Aggregator (TPA)</strong> under the <strong>Apprentices Act, 1961</strong>, approved by
                    the <strong>Ministry of Skill Development & Entrepreneurship (MSDE), Government of India</strong>.
                </p>
                <p className="mb-4 text-xl">
                    Through our TPA services, we actively promote the <strong>National Apprenticeship Promotion Scheme (NAPS)</strong> across{' '}
                    <strong>PAN India</strong>, facilitating workforce training and skill enhancement.
                </p>
                <a
                    href="https://www.nessa.in"
                    target='_blank'
                    className="text-xl text-blue-500 flex items-center">
                    <span className="mr-2">🌐</span>
                    www.nessa.in
                </a>
            </>
        )
    },
    {
        id: 3,
        content: (
            <>
                <h2 className="text-2xl font-bold mb-4">3. Entrepreneurship Development Program (EDP)</h2>
                <p className="mb-4 text-xl">
                    At Nessa, we firmly believe that <strong>entrepreneurship and self-employment</strong> are key drivers of economic growth. Our{' '}
                    <strong>Entrepreneurship Development Program (EDP)</strong> is designed to <strong>nurture aspiring entrepreneurs</strong>,
                    equipping them with the skills, knowledge, and resources necessary to succeed in their ventures.
                </p>
                <p className="mb-4 text-xl">
                    Through <strong>EDP</strong>, we aim to foster a culture of <strong>innovation, self-reliance, and economic empowerment</strong>.
                </p>
                <a
                    href="https://www.nessa.in"
                    target='_blank'
                    className="text-xl text-blue-500 flex items-center">
                    <span className="mr-2">🌐</span>
                    www.nessa.in
                </a>
            </>
        )
    }
]

export default function SkillingInitiativesSwiper() {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            pagination={{
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 3
            }}
            navigation={{
                clickable: true
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mt-8">
            {skillingInitiatives.map((initiative) => (
                <SwiperSlide
                    key={initiative.id}
                    className="px-[5vw]">
                    <div className="w-full mb-12 border border-blue-500 rounded-xl overflow-hidden">
                        <div className="p-8">{initiative.content}</div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
