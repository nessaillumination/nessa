import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { boardOfDirectors } from './AboutUsConfig'

export default function BoardOfDirectors() {
    const [activeDirector, setActiveDirector] = useState(null)

    return (
        <section className="relative py-16 mb-20 px-4 bg-white overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #f97316 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-8 md:mb-16">
                    <h2
                        className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight"
                        style={{ fontFamily: "'Georgia', serif" }}>
                        Board of Directors
                    </h2>
                    <p className="mt-4 text-gray-500 text-base md:text-lg max-w-xl leading-relaxed font-light">
                        Leaders guiding vision, governance, and growth .
                    </p>
                </div>

                {/* Swiper */}
                <div className="relative board-swiper-wrapper">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={24}
                        centeredSlides={false}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        navigation={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 1, spaceBetween: 24 },
                            768: { slidesPerView: 1, spaceBetween: 24 },
                            1280: { slidesPerView: 1, spaceBetween: 32 }
                        }}
                        modules={[Pagination, Navigation, Autoplay]}
                        loop={true}
                        autoplay={{ delay: 3000, pauseOnMouseEnter: true, disableOnInteraction: false }}
                        className="!pb-14 md:px-32">
                        {boardOfDirectors.map((director, index) => (
                            <SwiperSlide key={index}>
                                <DirectorCard
                                    director={director}
                                    onReadMore={() => setActiveDirector(director)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Bio Modal */}
            {activeDirector && (
                <BioModal
                    director={activeDirector}
                    onClose={() => setActiveDirector(null)}
                />
            )}

            <style>{`
                .board-swiper-wrapper .swiper-button-prev,
                .board-swiper-wrapper .swiper-button-next {
                    width: 44px;
                    height: 44px;
                    background:orange;
                    border-radius: 50%;
                    border: 1.5px solid #e5e7eb;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
                    color:white;
                    top: calc(50% - 28px);
                    transition: all 0.2s ease;
                }
                .board-swiper-wrapper .swiper-button-prev:hover,
                .board-swiper-wrapper .swiper-button-next:hover {
                    border-color: #f97316;
                    color: #f97316;
                }
                .board-swiper-wrapper .swiper-button-prev::after,
                .board-swiper-wrapper .swiper-button-next::after {
                    font-size: 13px;
                    font-weight: 700;
                }
                .board-swiper-wrapper .swiper-button-prev {
                    left: 0px;
                }
                .board-swiper-wrapper .swiper-button-next {
                    right: 0px;
                }
                .board-swiper-wrapper .swiper-pagination-bullet {
                    background: #d1d5db;
                    opacity: 1;
                    width: 7px;
                    height: 7px;
                    transition: all 0.25s ease;
                }
                .board-swiper-wrapper .swiper-pagination-bullet-active {
                    background: #f97316;
                    width: 22px;
                    border-radius: 4px;
                }
                {/* @media (max-width: 767px) {
                    .board-swiper-wrapper .swiper-button-prev,
                    .board-swiper-wrapper .swiper-button-next {
                        display: none;
                    } */}
                }
            `}</style>
        </section>
    )
}

function DirectorCard({ director, onReadMore }) {
    const initials = director.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)

    return (
        <div className="group flex flex-col md:flex-row bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 h-full">
            {/* Image / Avatar area */}
            <div className="relative bg-gradient-to-br  from-gray-50 to-slate-100 overflow-hidden">
                {director.image ? (
                    <img
                        src={director.image}
                        alt={director.name}
                        loading="lazy"
                        className="w-full h-72 object-contain md:object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="w-full h-72 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold tracking-tight">
                            {initials}
                        </div>
                    </div>
                )}

                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
                {/* Name & role */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-snug tracking-tight">{director.name}</h3>
                    <p className="mt-1 text-sm text-blue-600 font-medium leading-snug">{director.position}</p>
                    <div className="mt-3 w-10 h-0.5 bg-orange-400 rounded-full" />
                </div>

                {/* Bio excerpt */}
                <p className="mt-4 text-sm text-gray-500 leading-relaxed line-clamp-6 flex-1">{director.bio}</p>

                {/* CTA */}
                <button
                    onClick={onReadMore}
                    className="mt-5 self-start inline-flex items-center gap-1.5 text-md font-semibold text-blue-700 underline-offset-8 underline hover:text-orange-500 transition-colors duration-200 group/btn">
                    View full profile
                    <span className="inline-block translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                </button>
            </div>
        </div>
    )
}

function BioModal({ director, onClose }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}>
            <div
                className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}>
                {/* Modal header */}
                <div className="flex items-start gap-5 p-7 border-b border-gray-100">
                    {director.image ? (
                        <img
                            src={director.image}
                            alt={director.name}
                            className="w-20 h-20 rounded-xl object-cover object-top flex-shrink-0 border border-gray-100"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl font-bold flex-shrink-0">
                            {director.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .slice(0, 2)}
                        </div>
                    )}
                    <div className="flex-1 min-w-0 pt-1">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{director.name}</h3>
                        <p className="mt-1 text-sm text-blue-600 font-medium">{director.position}</p>
                        <div className="mt-2.5 w-10 h-0.5 bg-orange-400 rounded-full" />
                    </div>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors duration-150 text-lg leading-none"
                        aria-label="Close">
                        ×
                    </button>
                </div>

                {/* Bio body */}
                <div className="overflow-y-auto p-7">
                    <p className="text-gray-600 text-sm md:text-base leading-[1.85] whitespace-pre-line">{director.bio}</p>
                </div>
            </div>
        </div>
    )
}
