import { 
  FaHome, 
  FaBoxOpen, 
  FaEnvelope, 
  FaLifeRing, 
  FaPuzzlePiece,
  FaQuoteRight,
  FaProjectDiagram,
  FaBlog
} from "react-icons/fa";
import logo from '../../assets/logo.svg';

export const dashboardConfig = {
  logo: {
    src: logo,
    alt: "Logo",
    title: "MyApp",
  },
  generalItems: [
    { label: "Dashboard", icon: FaHome, path: "/dashboard", sublabels: [] },
    { label: "Product", icon: FaBoxOpen, path: "/dashboard/product", sublabels: [] },
    { label: "Contact Us", icon: FaEnvelope, path: "/dashboard/contactus", sublabels: [] },
    { label: "Support", icon: FaLifeRing, path: "/dashboard/support", sublabels: [] },
    { label: "Solution", icon: FaPuzzlePiece, path: "/dashboard/solutions", sublabels: [] },
    { label: "Testimonial", icon: FaQuoteRight, path: "/dashboard/testimonial", sublabels: [] },
    { label: "Projects", icon: FaProjectDiagram, path: "/dashboard/projects",sublabels: []},
    { label: "Blog", icon: FaBlog, path: "/dashboard/blogs", sublabels: []},
    { label: "Media", icon: FaBlog, path: "/dashboard/media", sublabels: []}

  ],
  settingItems: [
    // { label: "Account Setting", icon: FaCog, path: "/account-settings" },
    // { label: "Sign Out", icon: FaSignOutAlt, path: "/sign-out" },
  ]
};
