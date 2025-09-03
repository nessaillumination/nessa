import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()
    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center px-4 py-2 bg-white/5 rounded-full mb-8 backdrop-blur-sm border border-white/10">
                    <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-sm">Transforming Industries with Smart Lighting</span>
                </div>

                <h1 className="text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    Innovative Lighting Solutions for Every Industry
                </h1>

                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                    Experience the future of lighting with our advanced solutions. Designed for efficiency, built for sustainability.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold flex items-center justify-center gap-2 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/25">
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default Hero
