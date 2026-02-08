'use client'

import { Edit3, Trash2, Globe, Github, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { STATUS_CONFIG } from '@/domain/const/Achievements'
import { status } from '@/domain/const/Achievements'

interface Project {
    status: typeof status
    id: string
    title: string
    description: string
    image_url: string
    demo_link?: string
    repository_link?: string
    is_pinned: boolean
}

export const AdminProjectCard = ({
    project,
    onEdit,
    onDelete
}: {
    project: Project,
    onEdit: () => void,
    onDelete: () => void
}) => {
    const projectStatus = STATUS_CONFIG[project.status as unknown as status] || STATUS_CONFIG[status.NON_DEMARRER]
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group bg-slate-900/20 border border-white/5 p-4 rounded-4xl flex flex-col md:flex-row items-center justify-between hover:bg-slate-900/40 transition-all gap-4"
        >
            <div className="flex gap-5 items-center w-full">
                <div className="relative shrink-0">
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-20 h-20 rounded-3xl object-cover bg-slate-800 shadow-2xl border border-white/10"
                    />
                    {project.is_pinned && (
                        <div className="absolute -top-2 -right-2 bg-amber-500 p-1.5 rounded-full shadow-lg shadow-amber-500/20">
                            <Star size={10} className="text-black fill-black" />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg truncate">{project.title}</h3>
                    <div
                        className="text-xs text-slate-500 line-clamp-1 opacity-70 mb-2"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                    />

                    <div className="flex gap-3">
                        {project.demo_link && (
                            <a href={project.demo_link} target="_blank" className="flex items-center gap-1 text-[10px] font-bold text-blue-400 hover:text-blue-300 transition">
                                <Globe size={12} /> DÉMO
                            </a>
                        )}
                        {project.repository_link && (
                            <a href={project.repository_link} target="_blank" className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-white transition">
                                <Github size={12} /> REPO
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-2 shrink-0">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${projectStatus.color}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-tighter">
                        {projectStatus.label}
                    </span>
                </div>
                <button
                    onClick={onEdit}
                    className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                    title="Modifier"
                >
                    <Edit3 size={20} />
                </button>
                <button
                    onClick={onDelete}
                    className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Supprimer"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </motion.div>
    )
}