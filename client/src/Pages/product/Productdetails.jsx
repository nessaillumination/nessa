import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Applicationswiper from './Applicationswiper';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('features');
  const specification = product.specification || {};

  const tabs = [
    { id: 'features', label: 'Features & Benefits' },
    { id: 'specification', label: 'Specification' },
    { id: 'applications', label: 'Applications' }
  ];

  return (
      <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                  <h2 className="text-3xl font-semibold">
                      Product <span className="text-blue-500">Details</span>
                  </h2>
                  <div className="h-1 w-12 bg-blue-500 mx-auto mt-3 rounded-full" />
              </div>

              <div className="flex justify-center space-x-8 max-sm:space-x-2 mb-12 border-b">
                  {tabs.map((tab) => (
                      <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`pb-2 px-4 text-base  max-sm:text-xs font-medium relative ${
                              activeTab === tab.id ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'
                          }`}>
                          {activeTab === tab.id && (
                              <motion.div
                                  layoutId="activeTab"
                                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                              />
                          )}
                          {tab.label}
                      </button>
                  ))}
              </div>

              <AnimatePresence mode="wait">
                  <motion.div
                      key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}>
                      {activeTab === 'features' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                              {product.feature.highlighted.length > 0 ? (
                                  product.feature.highlighted.map((feature, index) => (
                                      <motion.div
                                          key={index}
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: index * 0.1 }}
                                          className="flex items-center text-gray-800 border-b border-gray-100 pb-4">
                                          <span className="w-[8px] h-[8px] bg-blue-500 rounded-full mr-3" />
                                          <p className="text-base">{feature}</p>
                                      </motion.div>
                                  ))
                              ) : (
                                  <p className="text-gray-500">No highlighted features available</p>
                              )}
                          </div>
                      )}

                      {activeTab === 'specification' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                              {Object.keys(specification).length > 0 ? (
                                  Object.entries(specification).map(([key, value], index) => (
                                      <motion.div
                                          key={key}
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: index * 0.1 }}
                                          className="flex justify-between items-center border-b border-gray-100 pb-4">
                                          <span className="text-gray-700">{key}</span>
                                          <span className="text-blue-500 font-medium">{value}</span>
                                      </motion.div>
                                  ))
                              ) : (
                                  <p className="text-gray-500">No specifications available</p>
                              )}
                          </div>
                      )}

                      {activeTab === 'applications' && (
                          <div className="w-full">
                              <Applicationswiper product={product} />
                          </div>
                      )}
                  </motion.div>
              </AnimatePresence>
          </div>
      </section>
  )
};

export default ProductTabs;