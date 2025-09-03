import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import WelcomePage from './Pages/Welcome/WelcomePage';
import Homepage from './Pages/homepage/Homepage';
import Solutions from './Pages/solutions/Solutions';
import SolutionDetail from './Pages/solutionDetail/SolutionDetail';
import Terms from './Pages/terms/Terms';
import ContactUs from './Pages/contactUs/ContactUs';
import EsgPolicy from './Pages/esgpolicy/EsgPolicy';
import PrivacyPolicy from './Pages/privacy1/Privacy1';
import Support from './Pages/support/Support';
import { Resources } from './Pages/resources/Resources';
import AllProducts from './Pages/allproducts/Allproducts';
import Product from './Pages/product/Product';
import AboutUs from './Pages/aboutUs/AboutUs';
import ScrollToTop from './Components/ScrollToTop';
import { Projects } from './Pages/projects/Projects';
import { ValueAddedServices } from './Pages/valueAddedServices/ValueAddedServices';
import CookiesPolicy from './Pages/CookiesPolicy/CookiesPolicy';
import BlogDetailPage from './Pages/blogDetail/BlogDetailPage';
import CookieConsent from './hooks/CookieConsent';
import BatteryAHcalculator from './Pages/calculators/BatteryAHcalculator';
import MaintenancePage from './Pages/Maintenance/MaintenancePage';

const MAINTENANCE_MODE = false;

const pageMetaData = {
    '/': {
      'title': 'Nessa | Home',
      'ogTitle': 'Innovative Lighting Solutions | LED Light Manufacturer India | Nessa',
      'description': 'Nessa, a leading LED light manufacturer in India, offers smart lighting and solar high mast solutions for industrial, commercial, and smart city projects.',
      'keywords': 'Led Light Manufacturers India, Led Lighting Companies in India, Solar HighMast Manufacturer, Smart light manufacturer, Solar high mast lights'
    },
    '/resources': {
      'title': 'Nessa | Resources',
      'ogTitle': 'LED & Solar Lighting Case Studies | Lighting Design Resources | Nessa',
      'description': 'Explore LED and solar lighting case studies, energy-efficient lighting guides, and industrial lighting design resources to enhance your next lighting project efficiently.',
      'keywords': 'led lighting case studies, lighting design resources, solar lighting case studies, energy efficient lighting guides, industrial lighting resources'
    },
    '/valueAddedServices': {
      'title': 'Nessa | Value Added Services',
      'ogTitle': 'Lighting Design & Installation | Smart Lighting Solutions | Nessa',
      'description': 'Lighting design, installation, and maintenance services. Smart lighting solutions and energy audit services to enhance efficiency and reliability for your projects.',
      'keywords': 'lighting design services, lighting maintenance services, energy audit services, lighting installation services, smart lighting solutions'
    },
    '/contactus': {
      'title': 'Nessa | Contact Us',
      'ogTitle': 'Contact LED Lighting Company | Get Lighting Solutions Quote | Nessa',
      'description': 'Contact Nessa for LED and solar lighting solutions in India. Enquire for quotes from leading LED lighting suppliers and enhance your projects with efficient lighting.',
      'keywords': 'led lighting company contact, lighting solutions enquiry, solar lighting company contact, get lighting quote, led lighting suppliers in india'
    },
    '/support': {
      'title': 'Nessa | Support',
      'ogTitle': 'LED & Solar Lighting Support | Technical & Maintenance Help | Nessa',
      'description': 'Get LED and solar lighting product support, technical assistance, and maintenance help. Nessa ensures reliable lighting solutions with expert support for your needs.',
      'keywords': 'led lighting support, lighting product support, solar lighting support, technical support for lighting, lighting maintenance support'
    },
    '/aboutus': {
      'title': 'Nessa | About Us',
      'ogTitle': 'About Nessa | LED & Solar Lighting Company in India | Nessa',
      'description': 'Learn about Nessa, a leading LED and solar lighting company in India. Providing energy-efficient lighting solutions for industrial, commercial, and public projects.',
      'keywords': 'led lighting company india, about led lighting company, solar lighting company india, energy efficient lighting company, lighting solutions company'
    },
    '/projects': {
      'title': 'Nessa | Projects',
      'ogTitle': 'LED & Solar Lighting Projects | Industrial & Outdoor Lighting | Nessa',
      'description': 'Explore Nessa’s LED and solar lighting projects, including industrial, outdoor, and lighting installation projects showcasing energy-efficient solutions across India.',
      'keywords': 'led lighting projects, solar lighting projects, lighting installation projects, industrial lighting projects, outdoor lighting projects'
    },
    '/calculator/battery_AH_calculator': {
      'title': 'Nessa | Battery AH Calculator',
      'ogTitle': 'Battery AH Calculator | Solar Battery Capacity & Size Tool | Nessa',
      'description': 'Use our battery AH calculator to find battery capacity, size, and backup needs. Ideal solar battery calculator for efficient energy storage planning and projects.',
      'keywords': 'battery ah calculator, battery capacity calculator, solar battery calculator, battery size calculator, battery backup calculator'
    },
    '/solutions': {
      'title': 'Nessa | Solutions',
      'ogTitle': 'Industrial & Outdoor LED Lighting Solutions for India | Nessa',
      'description': 'Explore LED, solar, industrial, and outdoor lighting solutions by Nessa. Energy-efficient lighting solutions tailored for reliable, sustainable project needs in India.',
      'keywords': 'led lighting solutions, solar lighting solutions, industrial lighting solutions, outdoor lighting solutions, energy efficient lighting solutions'
    },
    '/allproducts': {
      'title': 'Nessa | All Products',
      'ogTitle': 'Energy Efficient LED Lighting Products | Solar & Outdoor Lights | Nessa',
      'description': 'Explore industrial LED lights, solar lighting products, and outdoor LED solutions. Upgrade to energy-efficient lighting for reliable, sustainable project illumination.',
      'keywords': 'led lighting products, solar lighting products, industrial led lights, outdoor led lights, energy efficient lighting products'
    },
    '/terms': {
      'title': 'Nessa | Terms',
      'ogTitle': 'Terms and Conditions | Website Terms of Use & Disclaimer | Nessa',
      'description': 'Review our terms and conditions, website terms of use, privacy policy, and disclaimer to understand your rights while using Nessa’s LED and solar lighting website.',
      'keywords': 'terms and conditions, website terms of use, privacy policy and terms, terms of service, website disclaimer'
    },
    '/privacy': {
      'title': 'Nessa | Privacy Policy',
      'ogTitle': 'Privacy Policy | Website Data Privacy Policy India | Nessa',
      'description': 'Read Nessa’s privacy policy outlining data collection and usage practices. Learn how we protect your information while you browse our LED and solar lighting website.',
      'keywords': 'privacy policy, website privacy policy, privacy policy india, data privacy policy, privacy policy for website'
    },
    '/esgpolicy': {
      'title': 'Nessa | ESG Policy',
      'ogTitle': 'ESG Policy | Environmental Social Governance & Sustainability | Nessa',
      'description': 'Explore Nessa’s ESG policy and sustainability strategy. Our corporate environmental, social, and governance commitments drive responsible and sustainable practices.',
      'keywords': 'esg policy, environmental social governance policy, corporate esg policy, sustainability policy, esg strategy'
    },
    '/cookiespolicy': {
      'title': 'Nessa | Cookies Policy',
      'ogTitle': 'Cookies Policy | Website Cookie Consent & GDPR Policy | Nessa',
      'description': 'Read Nessa’s cookies policy to understand our website cookie practices, consent requirements, and GDPR compliance for a secure and transparent browsing experience.',
      'keywords': 'cookies policy, cookie policy for website, website cookie policy, cookie consent policy, gdpr cookie policy'
    }
  }

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Get meta data for the current route
    const meta = pageMetaData[location.pathname] || {
      title: 'Nessa',
      ogTitle: 'Nessa: Innovative Lighting and Solar Solutions',
      description: 'Nessa - Innovative solutions for a better future.',
      keywords: 'Nessa, solutions, technology',
    };

    // Set document title
    document.title = meta.title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = meta.description;

    // Set meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = meta.keywords;

    // Set Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = meta.ogTitle;

    // Cleanup (optional)
    return () => {
      // Reset to default or leave as is
    };
  }, [location.pathname]); // Run when the pathname changes

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
      <ScrollToTop />
      <CookieConsent />
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solutions/:title/:id" element={<SolutionDetail />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/esgpolicy" element={<EsgPolicy />} />
        <Route path="/cookiespolicy" element={<CookiesPolicy />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/product/:slug/:id" element={<Product />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/valueAddedServices" element={<ValueAddedServices />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:resource_type/:slug/:id" element={<BlogDetailPage />} />
        <Route path="/calculator/battery_AH_calculator" element={<BatteryAHcalculator />} />
      </Routes>
    </>
  );
};

export default App;