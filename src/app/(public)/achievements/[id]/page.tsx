/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useParams } from 'next/navigation'
import { find } from '@/shared/hooks/useAchievements/useAchievements'
import { Achievement } from '@/shared/entities/Achievement'
import { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, Github, Globe, Layout, Link } from 'lucide-react'
import { motion } from 'framer-motion'
import { status, STATUS_CONFIG } from '@/shared/const/Achievements'

export default function ProjectDetailsPage() {
    const { id } = useParams()

    const [project, setProject] = useState<Achievement | null>(null)
    const [loading, setLoading] = useState(true)
    const [statusInfo, setStatusInfo] = useState<any>()

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await find(id as string)
                setProject(data)
                // On force le cast vers ton enum 'status' pour indexer l'objet de config
                setStatusInfo(STATUS_CONFIG[data.status as status] || STATUS_CONFIG[status.NON_DEMARRER]);
            } catch (err) {
                console.error("Projet introuvable", err)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchProject()
    }, [id])

    if (loading) return <p>Chargement du projet...</p>
    if (!project) return <p>Projet non trouvé.</p>
    return (
        <main className="min-h-screen bg-[#050508] text-slate-200">
            {/* HEADER / HERO SECTION */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={project.image_url}
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#050508] via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6">
                    <div className="max-w-5xl mx-auto w-full">
                        <Link href="/achievements" className="flex items-center gap-2 text-blue-400 mb-8 hover:gap-4 transition-all font-bold uppercase text-xs tracking-widest">
                            <ArrowLeft size={16} /> Retour aux projets
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md ${statusInfo.color}`}>
                                {statusInfo.label}
                            </span>
                            <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter">
                                {project.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className="max-w-5xl mx-auto px-6 pb-32 grid lg:grid-cols-3 gap-16">

                {/* Colonne de gauche : Description Rich Text */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <Layout className="text-blue-500" /> À propos du projet
                        </h2>
                        <div
                            className="prose prose-invert prose-blue max-w-none text-slate-400 leading-relaxed text-lg"
                            dangerouslySetInnerHTML={{ __html: project.description }}
                        />
                    </div>
                </div>

                {/* Colonne de droite : Sidebar Infos */}
                <aside className="space-y-8">
                    <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl sticky top-32">
                        <h3 className="font-black text-xs uppercase tracking-[0.3em] text-slate-500 mb-8">Informations</h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500 flex items-center gap-2 text-sm"><Calendar size={16} /> Date</span>
                                <span className="font-bold text-sm">2026</span>
                            </div>

                            <hr className="border-white/5" />

                            <div className="flex flex-col gap-4 pt-4">
                                {project.demo_link && (
                                    <a
                                        href={project.demo_link}
                                        target="_blank"
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black transition-all shadow-lg shadow-blue-600/20"
                                    >
                                        <Globe size={18} /> VOIR LE LIVE
                                    </a>
                                )}
                                {project.repository_link && (
                                    <a
                                        href={project.repository_link}
                                        target="_blank"
                                        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-black transition-all"
                                    >
                                        <Github size={18} /> CODE SOURCE
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    )
}