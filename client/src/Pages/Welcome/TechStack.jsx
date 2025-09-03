import { motion } from 'framer-motion';
import { Server, Code, Database, BarChart, Terminal, Shield } from 'lucide-react';

const techStack = [
  { icon: <Server className="w-8 h-8 text-blue-400" />, name: 'Backend', tech: 'Node.js' },
  { icon: <Code className="w-8 h-8 text-green-400" />, name: 'Frontend', tech: 'React.js' },
  { icon: <Database className="w-8 h-8 text-purple-400" />, name: 'Database', tech: 'MongoDB' },
  { icon: <BarChart className="w-8 h-8 text-pink-400" />, name: 'Monitoring', tech: 'Datadog' },
  { icon: <Terminal className="w-8 h-8 text-yellow-400" />, name: 'Logging', tech: 'Winston' },
  { icon: <Shield className="w-8 h-8 text-red-400" />, name: 'Security', tech: 'Helmet' }
];

const TechStack = () => {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
      >
        Our Tech Stack
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {techStack.map((tech, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all"
          >
            <div>{tech.icon}</div>
            <div>
              <p className="font-semibold text-lg">{tech.name}</p>
              <p className="text-gray-400">{tech.tech}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;