import { motion } from 'framer-motion'

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative bg-charcoal rounded-xl overflow-hidden aspect-video cursor-pointer"
        >
            <div className="absolute inset-0 bg-gold/10 group-hover:bg-gold/0 transition-colors z-10" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 bg-gradient-to-t from-black/90 to-transparent">
                <h4 className="text-reignGold text-xs uppercase tracking-[0.3em] font-mono mb-2">
                    {project?.category?.name || 'Campaign'}
                </h4>
                <h3 className="text-xl md:text-2xl font-display font-bold text-reignWhite group-hover:text-reignGold transition-colors">
                    {project?.title}
                </h3>
            </div>
            {project?.image_path && (
                <img
                    src={project.image_path}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
            )}
        </motion.div>
    )
}

export default ProjectCard
