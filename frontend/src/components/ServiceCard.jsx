import { motion } from 'framer-motion'

const ServiceCard = ({ service }) => {
    return (
        <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="relative overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
        >
            {/* Service Image Background */}
            {service.image && (
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-reignBlack via-reignBlack/80 to-transparent"></div>
                </div>
            )}
            
            <div className="relative z-10 p-8">
                <div className="mb-6">
                    <span className="text-3xl md:text-4xl text-reignGold block group-hover:scale-110 transition-transform">
                        {service.icon || '✦'}
                    </span>
                </div>
                <h3 className="text-2xl font-display font-bold text-reignWhite mb-4 group-hover:text-reignGold transition-colors">
                    {service.name}
                </h3>
                <p className="text-reignWhite/50 leading-relaxed group-hover:text-reignWhite/70 transition-colors">
                    {service.description}
                </p>
            </div>
        </motion.div>
    )
}

export default ServiceCard
