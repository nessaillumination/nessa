import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../service/apiService';


const LoginPage = () => {
  const [email, setEmail] = useState('info@nessa.in');
  const [password, setPassword] = useState('Nessa@Info8949');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signIn(email, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      toast.success("Sign In Successful");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Check your credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 to-blue-400">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border border-transparent bg-clip-padding"
        style={{
          borderImage: 'linear-gradient(135deg, #4facfe, #00f2fe) 1',
        }}
      >
        {/* Logo and Project Name */}
        <div className="text-center">
          <img src={logo} alt="Nessa Logo" className="w-20 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-800">Nessa</h1>
          <p className="mt-2 text-gray-600">Welcome back! Please log in to your account.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
              placeholder="Enter your password"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-150 ease-in-out disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
