
import { useState, useEffect } from 'react'
import { X, Cookie } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const hasAccepted = localStorage.getItem('cookieConsent')
        if (!hasAccepted) {
            const timer = setTimeout(() => setIsVisible(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleConsent = (decision) => {
        localStorage.setItem('cookieConsent', decision)
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-50">
                    
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="relative bg-white border rounded-lg shadow-lg p-6">
                        
                        <button
                            aria-label="Close Cookie Consent"
                            onClick={() => setIsVisible(false)}
                            className="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-600">
                            <X className="h-4 w-4" />
                        </button>

                        <div className="flex items-center gap-2">
                            <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}>
                                <Cookie className="h-5 w-5 text-blue-600" />
                            </motion.div>
                            <h2 className="text-lg font-semibold">Cookie Preferences</h2>
                        </div>

                        <p className="mt-3 text-gray-600 text-sm">
                            <strong>Notice:</strong> We and selected third parties collect personal information and use cookies or similar technologies 
                            for technical purposes and, with your consent, for experience, measurement, and 
                            <strong> marketing (personalized ads)</strong> as specified in our 
                            <button
                                onClick={() => navigate('/cookiespolicy')}
                                className="text-blue-600 hover:underline ml-1">
                                Cookie Policy
                            </button>.
                        </p>

                        <p className="mt-2 text-gray-600 text-sm">
                            You can freely <strong>give, deny, or withdraw</strong> your consent at any time by accessing the <strong>preferences panel</strong>. 
                            Denying consent may make related features unavailable.
                        </p>

                        <p className="mt-2 text-gray-600 text-sm">
                            If you wish to <strong>opt out of the sale of your personal information</strong>, you may do so by using the 
                            <button
                                onClick={() => navigate('/donotsellmypersonalinfo')}
                                className="text-blue-600 hover:underline ml-1">
                                "Do Not Sell My Personal Information"
                            </button> link.
                        </p>

                        <p className="mt-2 text-gray-600 text-sm">
                            For more details on the <strong>categories of personal information collected</strong> and their purposes, please refer to our 
                            <button
                                onClick={() => navigate('/privacy')}
                                className="text-blue-600 hover:underline ml-1">
                                Privacy Policy
                            </button>.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleConsent('true')}
                                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                Accept All
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleConsent('false')}
                                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                                Decline
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default CookieConsent
