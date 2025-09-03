import { useEffect, useState } from 'react'
import { MdCall, MdEmail } from 'react-icons/md'
import { nessaServices } from './SupportConfig'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import supporthero from '../../assets/images/supportImages/supporthero.jpg'
import light from '../../assets/images/supportImages/light.png'
import manual from '../../assets/images/supportImages/manual.png'
import Navbar from '../../Components/Header/Navbar'
import SideComponent from '../../Components/sideComponent/SideComponent'
import { fetchUtilsData, saveSupportEnquiry, uploadFile } from '../../services/api.services'
import Footer from '../../Components/Footer'

const StyleWrapper = styled.div`
    input[type='file']::file-selector-button {
        height: 40px;
        padding-right: 30px;
        padding-left: 20px;
        border: none;
        cursor: pointer;
    }
`

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        companyName: '',
        phoneNumber: '',
        productName: '',
        productSKUId: '',
        fileLink: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [errors, setErrors] = useState({})
    const [acceptPolicy, setAcceptPolicy] = useState(false)

    const validateForm = () => {
        const newErrors = {}

        if (!acceptPolicy) {
            newErrors.policy = 'You must accept the policy to continue.'
        }

        if (!formData.name) {
            newErrors.name = 'Full Name is required.'
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters.'
        }

        if (!formData.email) {
            newErrors.email = 'Email is required.'
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.'
        }

        if (!formData.companyName) {
            newErrors.companyName = 'Company Name is required.'
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone Number is required.'
        } else if (!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number with country code (e.g., +91XXXXXXXXXX)'
        }

        if (!formData.productName) {
            newErrors.productName = 'Product Name is required.'
        }

        if (!formData.productSKUId) {
            newErrors.productSKUId = 'Product SKU ID is required.'
        }

        if (!formData.message) {
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
            formData.append('category', 'SUPPORT')

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
            const response = await saveSupportEnquiry(formData)
            if (response.success) {
                toast.success('Message sent successfully!')
                setFormData({
                    name: '',
                    email: '',
                    companyName: '',
                    phoneNumber: '',
                    productName: '',
                    productSKUId: '',
                    fileLink: '',
                    message: ''
                })
                setAcceptPolicy(false)
                setErrors({})
            } else {
                throw new Error(response.message || 'Failed to send message')
            }
        } catch (error) {
            toast.error(error.message || 'Failed to send message')
        } finally {
            setIsSubmitting(false)
        }
    }

 
    return (
        <StyleWrapper>
            <div className="w-full overflow-hidden">
                <Navbar />
                <SideComponent />

                <div className="w-full h-[300px] max-sm:h-[200px] relative flex items-center justify-center">
                    <img
                        loading='lazy'
                        className="w-full min-h-[150px] object-cover  absolute"
                        src={supporthero}
                        alt=""
                    />
                    {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white relative z-[2] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                        Support
                    </h1> */}
                </div>

                <div className="flex max-md:flex-col relative p-[5vw] gap-6">
                    <div className="absolute w-[250px] h-[250px] bg-[var(--light-blue)] opacity-30 right-[-70px] top-[-30px]   rounded-full z-[-1]"></div>

                    <form
                        className="w-1/2 max-md:w-full bg-white px-[20px] py-[40px] rounded-lg shadow-lg"
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
                                <label className="block text-gray-700">Email ID</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 border-b-2 font-semibold outline-none focus:border-blue-800 ${
                                        errors.email ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                                />
                                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Company Name</label>
                                <input
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border-b-2 font-semibold outline-none focus:border-blue-800 border-gray-500 rounded"
                                />
                                {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName}</span>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
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
                            <div>
                                <label className="block text-gray-700">Product Name</label>
                                <input
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 border-b-2 font-semibold outline-none focus:border-blue-800 ${
                                        errors.productName ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                                />
                                {errors.productName && <span className="text-red-500 text-sm">{errors.productName}</span>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Product SKU ID</label>
                                <input
                                    name="productSKUId"
                                    value={formData.productSKUId}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 border-b-2 font-semibold outline-none focus:border-blue-800 ${
                                        errors.productSKUId ? 'border-red-500' : 'border-gray-500'
                                    } rounded`}
                                />
                                {errors.productSKUId && <span className="text-red-500 text-sm">{errors.productSKUId}</span>}
                            </div>
                        </div>

                        <div className="mt-10">
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
                            <label className="block text-gray-700">Message</label>
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
                                <span className="text-sm text-gray-700">I accept the terms and conditions and privacy policy</span>
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

                    <div className="w-1/2 max-md:w-full relative bg-white  rounded-lg shadow-lg p-6">
                        <div className=" text-4xl font-semibold leading-snug  text-black z-[2] relative">
                            Register
                            <span className="text-blue-500"> complain</span> and we will contact you!!!
                        </div>
                        <div className="w-full min-h-[100px] p-[20px] rounded-lg">
                            <div className="flex items-center mb-2 gap-2">
                                <h1>Phone Support</h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdCall />
                                <h1>{'+919909041228'}</h1>
                            </div>
                        </div>
                        <div className="w-full min-h-[100px] p-[20px] rounded-lg">
                            <div className="flex items-center mb-2 gap-2">
                                <h1>Email Support</h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdEmail />
                                <h1>{'services@nessa.in'}</h1>
                            </div>
                        </div>
                        <div className="w-full absolute z-[0] left-0 bottom-0 flex items-end justify-end">
                            <img
                                loading='lazy'
                                className="h-[50%] w-[50%]"
                                src={light}
                                alt=""
                            />
                        </div>
                    </div>
                </div>

                <div className="flex max-md:flex-col max-md: justify-between px-[5vw] py-[50px] mb-[50px] bg-[var(--light-blue)]">
                    <div className="w-[60%] max-md:w-full">
                        <div className="text-4xl font-semibold leading-snug text-black z-[2] relative">
                            <span className="text-blue-500">Manuals</span> Download
                        </div>
                        <div className="relative mt-7 text-xl mb-4 leading-8 text-zinc-900 max-md:max-w-full">
                            Want to study details about our products. Download our Manual and know all that you require to be expertise for the light
                            repairing.
                        </div>
                        <div className="bg-blue-500 w-[250px] text-center py-[10px] mt-[20px] rounded-md text-white">Download Manuals</div>
                    </div>
                    <div className="w-[30%] max-md:w-full max-md:mt-[50px] h-[200px] flex items-center justify-center">
                        <img
                            loading='lazy'
                            className="w-full h-full object-contain"
                            src={manual}
                            alt=""
                        />
                    </div>
                </div>

                <div className="w-full py-[50px] my-[50px]">
                    <div className="text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
                        Nessa <span className="text-blue-500">Services</span>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
                    </div>
                    <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 px-[5vw] mt-[50px] gap-20 justify-items-center">
                        {nessaServices.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-5">
                                <img
                                    loading='lazy'
                                    className="w-[80px] h-[80px]"
                                    src={item.img}
                                    alt=""
                                />
                                <h1 className="text-xl text-center">{item.title}</h1>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-[400px] mb-10">
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

export default Support
