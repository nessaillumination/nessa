import React, { useState, useRef, useEffect } from 'react'
import { Share2, Copy, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoMdShare } from 'react-icons/io'

const ShareButton = ({ url = window.location.href, title }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const dropdownRef = useRef(null)

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const shareLinks = [
        {
            name: 'WhatsApp',
            url: isMobile
                ? `https://api.whatsapp.com/send?url=${encodeURIComponent(`${title} ${url}`)}`
                : `https://web.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}}`,
            bgColor: 'bg-green-500',
            hoverColor: 'hover:bg-green-600',
            iconColor: 'text-green-100'
        },
        {
            name: 'Email',
            url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check this out: ${url}`)}`,
            bgColor: 'bg-gray-500',
            hoverColor: 'hover:bg-gray-600',
            iconColor: 'text-gray-100'
        }
   
    ]

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const openShareWindow = (url, platform) => {
        const width = 600
        const height = 600
        const left = window.innerWidth / 2 - width / 2 + window.screenX
        const top = window.innerHeight / 2 - height / 2 + window.screenY

        window.open(
            url,
            `share-${platform}`,
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
        )
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div
            className="relative"
            ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-blue-100 rounded-xl bg-blue-50  ">
                <IoMdShare className="w-6 h-6 text-gray-600" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                        <div className="bg-blue-50 p-6">
                            <h2 className="text-xl font-bold mb-2 text-gray-800">Share this product</h2>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={copyToClipboard}
                                className="w-full mb-6 flex items-center justify-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md">
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="flex items-center gap-2">
                                            <Check className="w-5 h-5 text-green-500" />
                                            <span className="text-green-500 font-medium">Copied!</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="flex items-center gap-2">
                                            <Copy className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-600 font-medium">Copy Link</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            <div className="grid grid-cols-1 gap-3">
                                {shareLinks.map((platform, index) => (
                                    <motion.a
                                        key={platform.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: { delay: index * 0.1 }
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${platform.bgColor} ${platform.hoverColor} text-white p-4 rounded-xl text-center transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 font-medium`}
                                        onClick={() => {
                                            openShareWindow(platform.url, platform.name.toLowerCase())
                                            copyToClipboard
                                            setIsOpen(false)
                                        }}>
                                        {platform.name}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ShareButton
