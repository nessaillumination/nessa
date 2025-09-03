import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BiSearch, BiEnvelope, BiPhone, BiCalculator } from 'react-icons/bi'
import { RiBookletLine } from 'react-icons/ri'
import { FaWhatsapp } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

export const focusSearchInput = () => {
    const event = new CustomEvent('focusSearchInput')
    window.dispatchEvent(event)
}

const handleMailClick = () => {
    const mailtoLink = document.createElement('a')
    mailtoLink.href = 'mailto:info@nessa.in'
    mailtoLink.target = '_blank'
    mailtoLink.rel = 'noopener noreferrer'
    mailtoLink.click()
}

const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send?phone=918690779778', '_blank', 'noopener,noreferrer')
}

const SideComponent = () => {
    const navigate = useNavigate()
    const sidebarRef = useRef(null)

    const handleBrochureClick = () => {
        navigate('/resources')
    }

    const handlePaybackClick = () => {
        navigate('/calculator/battery_AH_calculator')
    }


    const [expandedIndex, setExpandedIndex] = useState(false)
    const [showCallModal, setShowCallModal] = useState(false)
    const [copiedNumber, setCopiedNumber] = useState(null)

    const phoneNumbers = [
        { number: '+91 8690779778', label: 'Sales Support' },
        { number: '+91 8690779778', label: 'Technical Support' }
    ]

    const handleCallClick = () => {
        setShowCallModal(true)
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const handleCallNumber = (phone) => {
        if (isMobile) {
            window.location.href = `tel:${phone.number.replace(/\s+/g, '')}`
            setShowCallModal(false)
        } else {
            navigator.clipboard.writeText(phone.number).then(() => {
                setCopiedNumber(phone.number)
                setTimeout(() => setCopiedNumber(null), 2000)
            })
        }
    }

    const menuItems = [
        { icon: BiSearch, label: 'Search Product', color: 'bg-[#0066CC]', action: focusSearchInput },
        { icon: BiEnvelope, label: 'Mail Us', color: 'bg-[#0066CC]', action: handleMailClick },
        { icon: BiPhone, label: 'Call Us', color: 'bg-[#0066CC]', action: handleCallClick },
        { icon: BiCalculator, label: 'Payback Calculator', color: 'bg-[#0066CC]' , action: handlePaybackClick},
        { icon: RiBookletLine, label: 'Brochure', color: 'bg-[#0066CC]', action: handleBrochureClick },
        { icon: FaWhatsapp, label: 'Whatsapp', color: 'bg-[#25D366]', action: handleWhatsAppClick }
    ]

    const handleItemClick = (action) => {
        if (action) {
            action()
        }
        setExpandedIndex(true)
    }

    const handleItemClose = () => {
        setExpandedIndex(false)
    }

    useEffect(() => {
        const handleOpenSidebar = () => {
            setExpandedIndex(false)
        }

        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setExpandedIndex(false)
            }
        }

        // window.addEventListener('openSidebar', handleOpenSidebar)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('openSidebar', handleOpenSidebar)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <>
            <div
                className="fixed right-0 top-[55%] z-50"
                ref={sidebarRef}>
                <AnimatePresence mode="wait">
                    {expandedIndex && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => handleItemClose()}
                            className="absolute top-[-20px] left-[-20px] w-[30px] h-[30px] text-sm z-[100] text-white bg-[#0066CC] rounded-full flex items-center justify-center cursor-pointer">
                            <ImCross size={16} />
                        </motion.div>
                    )}

                    <div className="relative">
                        <motion.div className="flex flex-col shadow-lg rounded-l-xl overflow-hidden">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="relative flex">
                                    <motion.div
                                        className={`${item.color} cursor-pointer relative z-10 border-r border-b`}
                                        onClick={() => handleItemClick(item.action)}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}>
                                        <div className="p-3 text-white hover:bg-opacity-90">
                                            <item.icon size={22} />
                                        </div>
                                    </motion.div>

                                    <AnimatePresence mode="wait">
                                        {expandedIndex && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20, width: 0 }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                    width: '200px',
                                                    transition: {
                                                        duration: 0.3,
                                                        ease: 'easeOut'
                                                    }
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    x: -20,
                                                    width: 0,
                                                    transition: {
                                                        duration: 0.3,
                                                        ease: 'easein'
                                                    }
                                                }}
                                                onClick={() => handleItemClick(item.action)}
                                                className={`${item.color} cursor-pointer border-b flex items-center text-white px-3`}>
                                                {item.label}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {showCallModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Contact Numbers</h2>
                                <button
                                    onClick={() => setShowCallModal(false)}
                                    className="text-gray-500 hover:text-gray-700">
                                    <ImCross size={16} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {phoneNumbers.map((phone, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleCallNumber(phone)}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                                        <div>
                                            <p className="font-medium text-gray-800">{phone.label}</p>
                                            <p className="text-blue-600">{phone.number}</p>
                                        </div>
                                        <BiPhone className="text-blue-600 text-xl" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default SideComponent
