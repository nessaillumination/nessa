import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchOneBlog } from '../../services/api.services'
import Navbar from '../../Components/Header/Navbar'
import SideComponent from '../../Components/sideComponent/SideComponent'
import toast from 'react-hot-toast'
import Footer from '../../Components/Footer'

const BlogDetailPage = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [tableOfContents, setTableOfContents] = useState([])

    const extractTableOfContents = (content) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(content, 'text/html')
        const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'))

        headings.forEach((heading, index) => {
            heading.id = `heading-${index}`
        })

        const modifiedContent = doc.body.innerHTML

        return {
            toc: headings.map((heading, index) => ({
                id: `heading-${index}`,
                title: heading.textContent,
                level: parseInt(heading.tagName.charAt(1))
            })),
            modifiedContent
        }
    }

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await fetchOneBlog(id)
                const { toc, modifiedContent } = extractTableOfContents(response.data.content)
                setBlog({
                    ...response.data,
                    content: modifiedContent 
                })
                setTableOfContents(toc)
                setLoading(false)
            } catch (err) {
                toast.error(err.message)
                setLoading(false)
            }
        }

        fetchBlogDetails()
    }, [id])

    const handleTocClick = (e, itemId) => {
        e.preventDefault()
        const element = document.getElementById(itemId)
        if (element) {
            const offset = 100 
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    if (loading) return <div className="flex justify-center items-center h-screen">Loading blog details...</div>
    if (error) return <div className="text-red-500 text-center mt-10">Error loading blog: {error.message}</div>

    return (
        <div className="w-full overflow-hidden">
            <Navbar />
            <SideComponent />

            <div className="w-full h-[300px] relative overflow-hidden">
                <img
                    loading="lazy"
                    src={blog.thumbnailImage || '/default-banner.jpg'}
                    alt="Blog Banner"
                    className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-black opacity-50" />
                <div className="absolute inset-0 flex items-center px-[5vw]">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white">{blog.title}</h1>
                </div>
            </div>

            <div className="flex max-md:flex-col  px-[5vw] py-8 gap-8">
                <div className="w-64 max-md:w-full flex-shrink-0">
                    <div className="sticky top-8 bg-gray-50 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">TABLE OF CONTENTS</h2>
                        <div className="space-y-2">
                            {tableOfContents.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => handleTocClick(e, item.id)}
                                    className="block text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-grow max-w-3xl">
                    {blog.tag && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {blog.tag.split(',').map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    )}

                    <div
                        className="prose max-w-full"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <div className="mt-8 border-t pt-6">
                        <p className="font-semibold text-gray-800 mb-4">Posted by :</p>
                        <div className="flex items-center space-x-4">
                            {blog.userImage && (
                                <img
                                    loading="lazy"
                                    src={blog.userImage}
                                    alt={blog.userName}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            )}
                            <div>
                                <p className="font-semibold text-gray-800">{blog.userName}</p>
                                <p className="text-sm text-gray-600">Updated: {new Date(blog.updatedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer/>
        </div>
    )
}

export default BlogDetailPage
