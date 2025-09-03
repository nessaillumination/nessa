import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="border-t border-white/10 mt-20"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="text-center text-gray-400">
          <p className="mb-2">Developed by Manish Dash Sharma</p>
          <p className="mb-2">Under <a href="https://futuredesks.in" className="text-blue-400 hover:text-blue-300 transition-colors">FutureDesks</a></p>
          <p>© {new Date().getFullYear()} Nessa. MIT License.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;