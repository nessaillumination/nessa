import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Clock, MemoryStick, ExternalLink } from 'lucide-react';
import { getServerHealth } from '../../services/api.services';

const ServerHealth = () => {
  const [serverHealth, setServerHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServerHealth = async () => {
      try {
        const health = await getServerHealth();
        setServerHealth(health);
      } catch (error) {
        console.error('Error fetching server health:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServerHealth();
  }, []);

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
      >
        System Status
      </motion.h2>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-semibold">Real-time Metrics</h3>
          <a 
            href="https://documenter.getpostman.com/view/26372308/2sAYBd6nFr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            API Docs <ExternalLink size={16} />
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          </div>
        ) : serverHealth ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="text-purple-400" />
                  <span className="text-gray-400">System Uptime</span>
                </div>
                <p className="text-xl font-semibold">{serverHealth.data.application.uptime}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Cpu className="text-blue-400" />
                  <span className="text-gray-400">CPU Usage</span>
                </div>
                <p className="text-xl font-semibold">{serverHealth.data.system.cpuUsage.join('%, ')}%</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <MemoryStick className="text-green-400" />
                  <span className="text-gray-400">Memory Usage</span>
                </div>
                <p className="text-xl font-semibold">{serverHealth.data.application.memoryUsage.heapUsed}</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl" />
              <div className="relative bg-white/5 p-6 rounded-xl border border-white/10 h-full">
                <h4 className="text-xl font-semibold mb-4">System Overview</h4>
                <div className="space-y-4">
                  <p className="text-gray-400">
                    Environment: <span className="text-white">{serverHealth.data.application.environment}</span>
                  </p>
                  <p className="text-gray-400">
                    Total Memory: <span className="text-white">{serverHealth.data.system.totalMemory}</span>
                  </p>
                  <p className="text-gray-400">
                    Free Memory: <span className="text-white">{serverHealth.data.system.freeMemory}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-red-400 py-8 bg-red-400/10 rounded-xl">
            Unable to fetch server health information
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerHealth;