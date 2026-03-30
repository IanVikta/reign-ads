import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api'

const Clients = () => {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await api.get('/clients')
                setClients(res.data || [])
            } catch (error) {
                console.error("Error fetching clients:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchClients()
    }, [])

    return (
        <div className="pt-32 pb-24 bg-reignBlack min-h-screen">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <h1 className="text-5xl md:text-8xl font-display font-bold text-reignWhite mb-8 italic">The Giant Network</h1>
                    <p className="text-reignGold font-mono text-sm tracking-[0.5em] uppercase">Trusted by the best in East Africa</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {clients.map((client) => (
                        <motion.div
                            key={client.id}
                            whileHover={{ scale: 1.05, borderColor: 'rgba(234, 179, 8, 0.3)' }}
                            className="bg-charcoal/20 border border-white/5 aspect-square flex items-center justify-center p-12 group transition-all"
                        >
                            {client.logo_path ? (
                                <img
                                    src={client.logo_path}
                                    alt={client.name}
                                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            ) : (
                                <span className="text-reignWhite font-display font-bold text-xl opacity-30 group-hover:opacity-100 group-hover:text-reignGold transition-all">
                                    {client.name}
                                </span>
                            )}
                        </motion.div>
                    ))}

                    {/* Placeholder Grid items to keep it full */}
                    {[...Array(Math.max(0, 8 - clients.length))].map((_, i) => (
                        <div key={i} className="bg-charcoal/20 border border-white/5 aspect-square flex items-center justify-center p-12 opacity-5 italic text-reignWhite/20">
                            Future Giant
                        </div>
                    ))}
                </div>

                <div className="mt-32 p-12 border-t border-white/5 text-center">
                    <h3 className="text-2xl font-display font-bold text-reignWhite mb-4">Become a Visibility Leader</h3>
                    <p className="text-reignWhite/40 mb-8 max-w-xl mx-auto">
                        Join our network of market leaders and start dominating your industry today.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="text-reignGold font-bold uppercase tracking-widest text-sm border-b-2 border-reignGold pb-2"
                    >
                        Partner With Us
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default Clients
