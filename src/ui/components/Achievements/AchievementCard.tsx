'use client'

import { motion } from 'framer-motion'
import { Globe, Github, ExternalLink, Link } from 'lucide-react'
import { STATUS_CONFIG } from '@/domain/const/Achievements'

export const AchievementCard = ({ project }: { project: any }) => {
    const statusKey = (project.status as keyof typeof STATUS_CONFIG) || 'not_start';
    const statusInfo = STATUS_CONFIG[statusKey];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all duration-500"
        >
            {/* Container Image avec Overlay au Hover */}
            <div className="relative aspect-16/10 overflow-hidden">
                <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay des liens au survol */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {project.demo_link && (
                        <a href={project.demo_link} target="_blank" className="p-4 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform shadow-xl shadow-blue-600/20">
                            <Globe size={22} />
                        </a>
                    )}
                    {project.repository_link && (
                        <a href={project.repository_link} target="_blank" className="p-4 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-full hover:scale-110 transition-transform">
                            <Github size={22} />
                        </a>
                    )}
                </div>

                {/* Badge de Status (toujours visible sur l'image) */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border backdrop-blur-md font-black text-[9px] uppercase tracking-widest ${statusInfo.color}`}>
                    {statusInfo.label}
                </div>
            </div>

            {/* Contenu Texte */}
            <div className="p-8">
                <h3 className="text-2xl font-black text-white mb-3 tracking-tighter uppercase italic leading-none">
                    {project.title}
                </h3>

                {/* Description avec rendu HTML limité à 2 lignes */}
                <div
                    className=" text-white dark:text-slate-400 text-sm line-clamp-2 prose prose-invert opacity-80"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                />

                <div className="mt-6 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Détails du projet</span>
                    <a href={`/achievements/${project.id}`}>
                        <ExternalLink size={14} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                    </a>
                </div>
            </div>
        </motion.div>
    )
}