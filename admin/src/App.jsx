import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './Pages/Auth/LoginPage'
import HomePage from './Pages/Home/HomePage'
import Dashboard from './Pages/DashBoard/DashBoard'
import ProductPage from './Pages/Product/ProductPage'
import SupportPage from './Pages/Support/SupportPage'
import ContactUsPage from './Pages/ContactUS/ContactUsPage'
import SolutionPage from './Pages/Solutions/SolutionPage'
import TestimonialPage from './Pages/Testomonials/TestinomialPage'
import ProjectsPage from './Pages/Projects/ProjectsPage'
import BlogPage from './Pages/Blogs/BlogsPages'
import MediaPage from './Pages/Media/MediaPage'
import MaintenancePage from './Pages/Maintenance/MaintenancePage'


const MAINTENANCE_MODE = false;
const App = () => {

    // If site is in maintenance mode, only show the maintenance page
    if (MAINTENANCE_MODE) {
        return (
            <Routes>
                <Route path="*" element={<MaintenancePage />} />
            </Routes>
        );
    }
    return (
        <>
            <Toaster reverseOrder={false} />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="dashboard" element={<Dashboard />}>
                    <Route index element={<HomePage />} />
                    <Route path="product" element={<ProductPage />} />
                    <Route path="support" element={<SupportPage />} />
                    <Route path="contactus" element={<ContactUsPage />} />
                    <Route path="solutions" element={<SolutionPage />} />
                    <Route path="testimonial" element={<TestimonialPage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="blogs" element={<BlogPage />} />
                    <Route path="media" element={<MediaPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default App

