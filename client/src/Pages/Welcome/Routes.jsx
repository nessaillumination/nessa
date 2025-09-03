import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react'; // Import missing icons

const Routes = () => {
    const getMainRoutes = [
        { title: 'Home', route: '/', icon: 'LayoutDashboard', status: 'Published' },
        { title: 'Solutions', route: '/solutions', icon: 'Lightbulb', status: 'Published' },
        { title: 'All Products', route: '/allproducts', icon: 'Package', status: 'Published' },
        { title: 'Product', route: '/product', icon: 'Box', status: 'Published' },
        { title: 'Resources', route: '/resources', icon: 'FileText', status: 'Published' },
        { title: 'About Us', route: '/aboutus', icon: 'Users', status: 'Published' },
        { title: 'Contact Us', route: '/contactus', icon: 'PhoneCall', status: 'Published' },
        { title: 'Support', route: '/support', icon: 'Headphones', status: 'Published' },
        { title: 'Terms of Service', route: '/terms', icon: 'FileText', status: 'Published' },
        { title: 'Privacy Policy', route: '/privacy', icon: 'Shield', status: 'Published' },
        { title: 'ESG Policy', route: '/esgpolicy', icon: 'Leaf', status: 'Published' },
        { title: 'Projects', route: '/projects', icon: 'Leaf', status: 'Published' },
        { title: 'Value Added Services', route: '/valueaddedservices', icon: 'Leaf', status: 'Published' },
      ];
      

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleNavigate = (route) => {
    window.open(`${window.location.origin}${route}`, '_blank');
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Navigation Dashboard
          </h1>
          <div className="text-gray-400">
            <span className="font-semibold">{getMainRoutes.length}</span> Routes found
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search Routes..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter by Status */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Filter by Status
            </label>
            <div className="flex flex-wrap gap-2">
              {['all', 'Published', 'Unpublished'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                    selectedStatus === status
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {status === 'all' ? 'All Statuses' : status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Routes Table */}
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Route Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {getMainRoutes.filter(route => {
                  const matchesSearch = route.title.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesStatus = selectedStatus === 'all' || route.status === selectedStatus;
                  return matchesSearch && matchesStatus;
                }).map((route, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-white">{route.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        route.status === 'Published'
                          ? 'bg-green-400/10 text-green-400'
                          : 'bg-yellow-400/10 text-yellow-400'
                      }`}>
                        {route.status === 'Published' ? (
                          <Check className="w-4 h-4 mr-1" />
                        ) : (
                          <AlertCircle className="w-4 h-4 mr-1" />
                        )}
                        {route.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400">{route.route}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleNavigate(route.route)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium transition-colors duration-200"
                      >
                        Open
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Routes;
