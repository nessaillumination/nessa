import { motion } from 'framer-motion';
import IPAnalyticsDashboard from './IPAnalyticsDashboard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const WelcomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
          navigate('/');
      }
  }, [navigate]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen text-white overflow-hidden scrollbar-hide"
    >

      <div className="relative">
        <IPAnalyticsDashboard />
      </div>
    </motion.div>
  );
};

export default WelcomePage;