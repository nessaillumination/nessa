import { useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { MdCall } from 'react-icons/md'
import { MdEmail } from 'react-icons/md'
import { RiFacebookBoxLine } from 'react-icons/ri'
import { FaInstagram } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { CiLinkedin } from 'react-icons/ci'
import { RiTwitterXFill } from 'react-icons/ri'
import styled from 'styled-components'
import airportpageposter from '../../assets/images/solutionsImages/airportpageposter.png'
import contactushero from '../../assets/images/contactus/CONTACTUSHERO.jpg'
import toast from 'react-hot-toast'
import Navbar from '../../Components/Header/Navbar'
import SideComponent from '../../Components/sideComponent/SideComponent'
import { fetchUtilsData, saveContactUs, uploadFile } from '../../services/api.services'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'

const StyleWrapper = styled.div`
    input[type='file']::file-selector-button {
        height: 40px;
        background-color:;
        padding-right: 30px;
        padding-left: 20px;
        border: none;
        cursor: pointer;
    }
`

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        companyName: '',
        phoneNumber: '',
        subject: 'General Inquiry',
        fileLink: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [acceptPolicy, setAcceptPolicy] = useState(false)
    const [errors, setErrors] = useState({})
    const validateForm = () => {
        const newErrors = {}

        if (!acceptPolicy) {
            newErrors.policy = 'You must accept the policy to continue.'
        }
        if (!formData.name.trim()) {
            newErrors.name = 'Full Name is required.'
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters.'
        }

        if (!formData.email) {
            newErrors.email = 'Email is required.'
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.'
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company Name is required.'
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone Number is required.'
        } else if (!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number with country code (e.g., +91XXXXXXXXXX)'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required.'
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters long.'
        }

        return newErrors
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/[^\d+]/g, '')
        if (value && !value.startsWith('+')) {
            value = '+' + value
        }
        setFormData((prev) => ({
            ...prev,
            phoneNumber: value
        }))
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (file.size > 1000000) {
            toast.error('File size must be less than 1MB')
            e.target.value = null
            return
        }

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('category', 'CONTACT_US')

            const response = await uploadFile(formData)
            if (response.success) {
                setFormData((prev) => ({
                    ...prev,
                    fileLink: response.data
                }))
                toast.success(`File uploaded successfully`)
            }
        } catch (error) {
            toast.error(error.message || 'Error uploading file')
            e.target.value = null
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = validateForm()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            toast.error('Please fix all errors before submitting')
            return
        }

        setIsSubmitting(true)
        try {
            const response = await saveContactUs(formData)
            if (response.success) {
                toast.success('Message sent successfully!')
                setFormData({
                    name: '',
                    email: '',
                    companyName: '',
                    phoneNumber: '',
                    subject: 'General Inquiry',
                    fileLink: '',
                    message: ''
                })
                setAcceptPolicy(false)
                setErrors({})
            } else {
                throw new Error(response.message || 'Failed to send message')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <StyleWrapper>
            <div className="w-full overflow-hidden">
                <Navbar />
                <SideComponent />

                <div className="w-full h-[300px] max-sm:h-[200px] relative flex items-center  justify-center ">
                    <img
                        loading="lazy"
                        className="w-full h-full object-cover object-left absolute  "
                        src={contactushero}
                        alt=""
                    />
                    {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white  relative z-[2] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                        Contact Us
                    </h1> */}
                </div>

                <div className="flex max-lg:flex-col relative p-[5vw] gap-6 ">
                    <div className="absolute w-[250px] h-[250px] bg-[var(--light-blue)] opacity-30 right-[-70px] top-[-30px]   rounded-full z-[-1]"></div>

                    <div className="w-1/2 relative overflow-hidden max-lg:w-full p-[10px]  text-white  rounded-lg shadow-lg">
                        <div className="w-full min-h-[150px] bg-blue-500 rounded-lg p-[30px]">
                            <h1 className="text-4xl font-semibold">Headquarters Address</h1>
                            <div className="flex items-center justify-center mt-5  gap-10">
                                <FaLocationDot className="w-6 h-6" />
                                <h1>36-A, Devraj Industrial Park, Near Pipalaj, Pirana Rd, Piplaj, Ahmedabad, Gujarat 382405 </h1>
                            </div>
                        </div>
                        <div className="flex justify-between mt-5 text-black  gap-5 max-[400px]:flex-col ">
                            <div className="w-1/2 max-[400px]:w-full max-[400px]:flex max-[400px]:flex-col max-[400px]:justify-center max-[400px]:items-center  min-h-[100px] p-[20px] max-sm:px-[10px] max-sm:text-sm bg-blue-300 rounded-lg">
                                <h1 className="font-semibold text-lg mb-2">Domestic Inquiry</h1>
                                <div className="flex  flex-wrap  items-center gap-2">
                                    <MdCall />
                                    <h1>+919375279778</h1>
                                </div>
                                <div className="flex   flex-wrap items-center gap-2">
                                    <MdEmail />
                                    <h1>sales@nessa.in</h1>
                                </div>
                            </div>
                            <div className="w-1/2 max-[400px]:w-full max-[400px]:flex max-[400px]:flex-col max-[400px]:justify-center max-[400px]:items-center  min-h-[100px] p-[20px] max-sm:px-[10px] max-sm:text-sm bg-blue-300 rounded-lg">
                                <h1 className="font-semibold text-lg mb-2">International Inquiry</h1>
                                <div className="flex  flex-wrap  items-center gap-2">
                                    <MdCall />
                                    <h1>+919636379923</h1>
                                </div>
                                <div className="flex   flex-wrap items-center gap-2">
                                    <MdEmail />
                                    <h1>exports@nessa.in</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-5 text-black  gap-5 max-[400px]:flex-col ">
                            <div className="w-1/2 max-[400px]:w-full max-[400px]:flex max-[400px]:flex-col max-[400px]:justify-center max-[400px]:items-center  min-h-[100px] p-[20px] max-sm:px-[10px] max-sm:text-sm bg-blue-300 rounded-lg">
                                <h1 className="font-semibold text-lg mb-2">Service Inquiry</h1>
                                <div className="flex  flex-wrap  items-center gap-2">
                                    <MdCall />
                                    <h1>+919909041228 </h1>
                                </div>
                                <div className="flex   flex-wrap items-center gap-2">
                                    <MdEmail />
                                    <h1>services@nessa.in</h1>
                                </div>
                            </div>
                            <div className="w-1/2 max-[400px]:w-full max-[400px]:flex max-[400px]:flex-col max-[400px]:justify-center max-[400px]:items-center  min-h-[100px] p-[20px] max-sm:px-[10px] max-sm:text-sm bg-blue-300 rounded-lg">
                                <h1 className="font-semibold text-lg mb-2">Career Inquiry</h1>
                                <div className="flex  flex-wrap  items-center gap-2">
                                    <MdCall />
                                    <h1>+919879100877</h1>
                                </div>
                                <div className="flex   flex-wrap items-center gap-2">
                                    <MdEmail />
                                    <h1> careers@nessa.in</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-5 text-black  gap-5 max-[400px]:flex-col ">
                            <div className="w-1/2 max-[400px]:w-full max-[400px]:flex max-[400px]:flex-col max-[400px]:justify-center max-[400px]:items-center  min-h-[100px] p-[20px] max-sm:px-[10px] max-sm:text-sm bg-blue-300 rounded-lg">
                                <h1 className="font-semibold text-lg mb-2">Marketing Inquiry</h1>
                                <div className="flex  flex-wrap  items-center gap-2">
                                    <MdCall />
                                    <h1>+918690779778 </h1>
                                </div>
                                <div className="flex   flex-wrap items-center gap-2">
                                    <MdEmail />
                                    <h1> marketing@nessa.in </h1>
                                </div>
                            </div>
                            <div className="w-1/2 max-[400px]:w-full max-[400px]:flex max-[400px]:flex-col max-[400px]:justify-center max-[400px]:items-center  min-h-[100px] p-[20px] max-sm:px-[10px] max-sm:text-sm bg-blue-300 rounded-lg">
                                <h1 className="font-semibold text-lg mb-2">CSR Inquiry</h1>
                                <div className="flex  flex-wrap  items-center gap-2">
                                    <MdCall />
                                    <h1>+919909041719</h1>
                                </div>
                                <div className="flex   flex-wrap items-center gap-2">
                                    <MdEmail />
                                    <h1> csr@nessa.in</h1>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-5 flex flex-col text-black items-center justify-center  min-h-[100px] p-[20px] max-sm:px-[10px] max-sm:text-sm bg-blue-300 rounded-lg">
                            <h1 className="font-semibold text-lg mb-2">Other Inquiry</h1>
                            <div className="flex  flex-wrap  items-center gap-2">
                                <MdCall />
                                <h1>+918000479780</h1>
                            </div>
                            <div className="flex   flex-wrap items-center gap-2">
                                <MdEmail />
                                <h1> info@nessa.in</h1>
                            </div>
                        </div>
                        <div className=" w-[200px] h-[200px] z-[-1] rounded-full bg-yellow-400 absolute left-[-20px] bottom-[-80px] "></div>
                        <div className="w-[100px] z-[-2] h-[100px] bg-yellow-200 opacity-80 absolute left-[100px] bottom-[50px]  rounded-full"></div>
                        <div className="w-full text-black min-h-[100px] mt-5 flex items-end justify-end gap-5 p-[20px] text-3xl rounded-lg">
                            <div className="flex gap-4">
                                <Link
                                    to="https://www.instagram.com/nessa.illumination?igsh=MWd2NWxxbXFrbjkyOQ=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black text-2xl hover:text-gray-400">
                                    <FaInstagram />
                                </Link>
                                <Link
                                    to="https://www.facebook.com/share/15Z3mQLR5s/?mibextid=LQQJ4d"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black text-2xl hover:text-gray-400">
                                    <RiFacebookBoxLine />
                                </Link>
                                <Link
                                    to="https://api.whatsapp.com/send?phone=918690779778"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black text-2xl hover:text-gray-400">
                                    <IoLogoWhatsapp />
                                </Link>
                                <Link
                                    to="https://www.linkedin.com/company/nessa-illumination-technologies/ "
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black text-2xl hover:text-gray-400">
                                    <CiLinkedin />
                                </Link>
                                <Link
                                    to="https://x.com/nessaledlights?s=21&t=SDO__KiQh-rlzCEB0xXW7g"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black text-2xl hover:text-gray-400">
                                    <RiTwitterXFill />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <form
                        className="w-1/2 max-lg:w-full bg-white px-[20px] py-[40px]  rounded-lg shadow-lg"
                        onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <label className="block text-gray-700">Full Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 border-b-2 font-semibold outline-none focus:border-blue-800 ${
                                        errors.name ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                                />
                                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                            </div>
                            <div>
                                <label className="block text-gray-700  ">Email ID</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 border-b-2 font-semibold outline-none focus:border-blue-800   ${
                                        errors.email ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                                />
                                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                            </div>
                            <div>
                                <label className="block text-gray-700  "> Company Name</label>
                                <input
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border-b-2 font-semibold outline-none focus:border-blue-800  border-gray-500 rounded"
                                />
                                {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName}</span>}
                            </div>
                            <div>
                                <label className="block text-gray-700  ">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handlePhoneChange}
                                    placeholder="+91XXXXXXXXXX"
                                    className={`w-full p-2 border-b-2 font-semibold outline-none focus:border-blue-800 ${
                                        errors.phoneNumber ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                                />
                                {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
                            </div>
                        </div>

                        <div className="mt-10">
                            <label className="block text-gray-700 mb-2  ">Select Subject</label>
                            {['General Inquiry', 'Domestic Inquiry', 'Service Inquiry', 'International Inquiry', 'CSR Inquiry', 'Career Inquiry'].map(
                                (subject, index) => (
                                    <label
                                        key={index}
                                        className="inline-flex items-center mr-6 mb-4 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="subject"
                                            value={subject}
                                            checked={formData.subject === subject}
                                            onChange={handleInputChange}
                                            className="form-radio cursor-pointer"
                                        />
                                        <span className="ml-2">{subject}</span>
                                    </label>
                                )
                            )}
                        </div>

                        <div className="mt-6">
                            <label className="block text-gray-700 mb-2">File Upload</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="w-fit h-[40px] border border-gray-500 rounded"
                                disabled={isUploading}
                            />
                            {isUploading && <p className="text-sm text-blue-500 mt-1">Uploading file...</p>}
                            {formData.fileLink && <p className="text-sm text-green-500 mt-1">File uploaded successfully</p>}
                            <p className="text-sm text-gray-500 mt-1">Maximum file size: 1MB</p>
                        </div>
                        <div className="mt-10">
                            <label className="block text-gray-700  ">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className={`w-full p-2 border-b-2 font-semibold outline-none focus:border-blue-800 h-[50px] max-h-[100px] ${
                                    errors.message ? 'border-red-500' : 'border-gray-500'
                                } rounded`}></textarea>
                            {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
                        </div>
                        <div className="mt-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={acceptPolicy}
                                    onChange={(e) => setAcceptPolicy(e.target.checked)}
                                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">I accept the terms and conditions and privacy policy </span>
                            </label>
                            {errors.policy && <span className="text-red-500 text-sm block mt-1">{errors.policy}</span>}
                        </div>

                        <div className="w-full flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting || isUploading || !acceptPolicy}
                                className={`mt-10 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition ${
                                    isSubmitting || isUploading || !acceptPolicy ? 'opacity-50 cursor-not-allowed' : ''
                                }`}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="w-full h-[400px] mb-10 ">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7348.649409568016!2d72.54749124151411!3d22.938265850794643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e859f9e9ee219%3A0x4762594d909ba9f2!2sNessa%20Illumination%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1734817362201!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <Footer />
        </StyleWrapper>
    )
}

export default ContactUs
