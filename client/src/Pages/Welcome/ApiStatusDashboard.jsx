import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, Search, Filter } from 'lucide-react';
import { apiDetailsStatus } from '../../services/api.services';

const ApiStatusDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiDetailsStatus();
      setApiData(response.data);
    };
    fetchData();
  }, []);

  // Get unique statuses from API data
  const statuses = ['all', ...new Set(apiData.map(api => api.status))];

  // Filter APIs based on search, category, and status
  const filteredApis = apiData.filter(api => {
    const matchesSearch = api.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || api.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || api.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories
  const categories = ['all', ...new Set(apiData.map(api => api.category))];

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            API Status Dashboard
          </h1>
          <div className="text-gray-400">
            <span className="font-semibold">{filteredApis.length}</span> APIs found
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search APIs..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                Filter by Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                Filter by Status
              </label>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
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
        </div>

        {/* API Table */}
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">API Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredApis.map((api, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-white">{api.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{api.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        api.status === 'Published'
                          ? 'bg-green-400/10 text-green-400'
                          : 'bg-yellow-400/10 text-yellow-400'
                      }`}>
                        {api.status === 'Published' ? (
                          <Check className="w-4 h-4 mr-1" />
                        ) : (
                          <AlertCircle className="w-4 h-4 mr-1" />
                        )}
                        {api.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400">{api.description}</span>
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

export default ApiStatusDashboard;