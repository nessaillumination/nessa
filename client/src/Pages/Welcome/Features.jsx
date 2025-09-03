import { motion } from 'framer-motion';
import { Globe, Leaf, Wrench } from 'lucide-react';

const features = [
  {
    icon: <Globe className="w-12 h-12 text-blue-400" />,
    title: 'Global Expertise',
    description: 'Trusted by clients in 20+ countries worldwide, delivering excellence across borders.'
  },
  {
    icon: <Leaf className="w-12 h-12 text-green-400" />,
    title: 'Sustainable Solutions',
    description: 'Energy-efficient lighting systems that reduce carbon footprint and operating costs.'
  },
  {
    icon: <Wrench className="w-12 h-12 text-purple-400" />,
    title: 'Customizable Products',
    description: 'Tailored lighting solutions that adapt to your specific industry requirements.'
  }
];

const Features = () => {
  return (
    <div>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
      >
        Why Choose Nessa?
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="group relative bg-gradient-to-b from-white/5 to-transparent p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            <div className="relative">
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-center">{feature.title}</h3>
              <p className="text-gray-400 text-center">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;