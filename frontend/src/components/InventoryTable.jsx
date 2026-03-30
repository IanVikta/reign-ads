import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import { inventory } from '../data/inventory';

const InventoryTable = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInventory = inventory.filter((item) =>
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-reignBlack relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-reignGold rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-blue-900/30 border border-blue-500/30 text-reignGold text-xs font-bold uppercase tracking-wider">
                Billboard Inventory
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-black text-reignWhite mb-3"
            >
              Available{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-reignGold">
                Billboard Spaces
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-reignWhite/60 max-w-2xl mx-auto"
            >
              Browse our current billboard inventory and secure your advertising space
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Search Bar with Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 max-w-md mx-auto"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-reignGold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-gray-800/50 border-2 border-blue-500/30 text-reignWhite placeholder-reignWhite/40 focus:outline-none focus:border-reignGold/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Desktop: Enhanced Table View */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hidden md:block overflow-x-auto mb-8"
        >
          <div className="bg-gradient-to-br from-blue-900/10 to-gray-900/20 border border-blue-500/20 backdrop-blur-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-900/50 to-blue-800/30 border-b-2 border-reignGold/50">
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-reignGold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-reignGold font-bold uppercase tracking-wider text-sm">
                        Location
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-reignGold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      <span className="text-reignGold font-bold uppercase tracking-wider text-sm">
                        Billboard Size
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-reignGold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="text-reignGold font-bold uppercase tracking-wider text-sm">
                        Traffic Level
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-reignGold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-reignGold font-bold uppercase tracking-wider text-sm">
                        Status
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`border-b border-gray-700/30 hover:bg-blue-900/10 transition-all group ${
                      index % 2 === 0 ? 'bg-gray-800/10' : 'bg-gray-900/10'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:bg-reignGold transition-colors"></div>
                        <span className="text-reignWhite font-semibold group-hover:text-reignGold transition-colors">
                          {item.location}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-reignWhite/80 font-medium">{item.size}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          item.trafficLevel === 'High Traffic' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className="text-reignWhite/80">{item.trafficLevel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                          item.status === 'Available'
                            ? 'bg-green-500/20 text-green-400 border-green-500/50 hover:bg-green-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/50'
                        }`}
                      >
                        {item.status === 'Available' && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {item.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile: Enhanced Card View */}
        <div className="grid grid-cols-1 gap-4 md:hidden mb-8">
          {filteredInventory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-gradient-to-br from-blue-900/20 to-gray-900/40 border-2 border-blue-500/20 backdrop-blur-sm p-5 hover:border-reignGold/50 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-reignGold text-xs uppercase tracking-wider mb-1 font-semibold">
                    Location
                  </p>
                  <p className="text-reignWhite font-bold text-lg">
                    {item.location}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 ${
                    item.status === 'Available'
                      ? 'bg-green-500/20 text-green-400 border-green-500/50'
                      : 'bg-red-500/20 text-red-400 border-red-500/50'
                  }`}
                >
                  {item.status === 'Available' && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-500/20">
                <div>
                  <p className="text-reignGold text-xs uppercase tracking-wider mb-1 font-semibold">
                    Size
                  </p>
                  <p className="text-reignWhite/80 font-medium">{item.size}</p>
                </div>
                <div>
                  <p className="text-reignGold text-xs uppercase tracking-wider mb-1 font-semibold">
                    Traffic
                  </p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.trafficLevel === 'High Traffic' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <p className="text-reignWhite/80 text-sm">{item.trafficLevel}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link to="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(212,175,55,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-3 bg-gradient-to-r from-reignGold to-yellow-500 text-reignBlack font-bold uppercase tracking-wider hover:from-yellow-500 hover:to-reignGold transition-all text-sm shadow-lg"
            >
              <span className="flex items-center gap-2">
                View Full Inventory
                <svg
                  className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InventoryTable;
