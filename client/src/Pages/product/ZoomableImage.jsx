import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, X, ChevronLeft, ChevronRight, Plus, Minus, RotateCcw } from 'lucide-react'

const ZoomableImage = ({ images, selectedIndex, onClose, onIndexChange }) => {
    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)

    const handleDragStart = () => setIsDragging(true)
    const handleDragEnd = () => setIsDragging(false)

    const handleWheel = (e) => {
        e.preventDefault()
        const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1)
        setScale(Math.min(Math.max(0.5, newScale), 4))
    }

    const zoomIn = (e) => {
        e.stopPropagation()
        setScale(Math.min(scale + 0.2, 4))
    }

    const zoomOut = (e) => {
        e.stopPropagation()
        setScale(Math.max(scale - 0.2, 0.5))
    }

    const nextImage = () => {
        if (selectedIndex < images.length - 1) {
            onIndexChange(selectedIndex + 1)
            resetZoom()
        }
    }

    const prevImage = () => {
        if (selectedIndex > 0) {
            onIndexChange(selectedIndex - 1)
            resetZoom()
        }
    }

    const resetZoom = (e) => {
        if (e) e.stopPropagation()
        setScale(1)
        setPosition({ x: 0, y: 0 })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center"
            onClick={() => onClose()}>
            <div className="absolute top-4 left-4 flex gap-2">
                <button
                    onClick={zoomIn}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                    <Plus className="w-6 h-6 text-white" />
                </button>
                <button
                    onClick={zoomOut}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                    <Minus className="w-6 h-6 text-white" />
                </button>
                <button
                    onClick={resetZoom}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                    <RotateCcw className="w-6 h-6 text-white" />
                </button>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onClose()
                }}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20">
                <X className="w-6 h-6 text-white" />
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedIndex === 0}>
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <motion.div
                className="relative overflow-hidden w-[90vw] h-[90vh]"
                onClick={(e) => e.stopPropagation()}>
                <motion.img
                    src={images[selectedIndex]}
                    alt="Zoomed product view"
                    className="w-full h-full object-contain"
                    drag
                    dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                    dragElastic={0.1}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onWheel={handleWheel}
                    style={{
                        scale,
                        x: position.x,
                        y: position.y,
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                />
            </motion.div>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedIndex === images.length - 1}>
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white">
                {selectedIndex + 1} / {images.length}
            </div>

            <div className="absolute bottom-4 right-4 bg-black/50 px-4 py-2 rounded-full text-white">{Math.round(scale * 100)}%</div>
        </motion.div>
    )
}

const ImageViewer = ({ images, selectedIndex, onSelectedIndexChange }) => {
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <div className=" w-[70%] max-lg:w-full h-[500px] max-lg:h-[300px] p-4 bg-blue-50 rounded-xl relative ">
            <div
                id="selectedImage"
                className=" relative w-full h-full">
                <img
                    src={images[selectedIndex]}
                    alt={`Product View ${selectedIndex + 1}`}
                    className="w-full h-full object-contain"
                />
                <button
                    onClick={() => setIsZoomed(true)}
                    className="absolute bottom-3 right-3 p-2 bg-white/80 rounded-full shadow-lg bg-white">
                    <ZoomIn className="w-5 h-5 text-gray-700" />
                </button>
            </div>

            <AnimatePresence>
                {isZoomed && (
                    <ZoomableImage
                        images={images}
                        selectedIndex={selectedIndex}
                        onClose={() => setIsZoomed(false)}
                        onIndexChange={onSelectedIndexChange}
                    />
                )}
            </AnimatePresence>
        </div>
    )
};


export default ImageViewer
