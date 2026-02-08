'use client'

import { Stack } from '@/domain/entities/Stacks'
import { motion } from 'framer-motion'

export const StackCard = ({ name, logo_url, description }: Stack) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative flex flex-col justify-center gap-4 min-h-[140px] px-8 py-8 mx-4 my-2
                       bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] 
                       hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
        >
            {/* Effet de lueur diffuse en arrière-plan */}
            <div className="absolute -inset-1 bg-linear-to-br from-blue-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10" />

            {/* Ligne d'accentuation dynamique */}
            <div className="absolute top-0 left-10 right-10 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

            <div className="relative z-10 flex flex-col gap-4">
                <div className='flex items-center gap-5'>
                    {/* Container du Logo */}
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-black/40 flex items-center justify-center 
                                  border border-white/5 shadow-2xl group-hover:border-blue-500/20 group-hover:bg-black/60 transition-all">
                        <img
                            src={logo_url}
                            alt={name}
                            className="w-8 h-8 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                        />
                    </div>

                    {/* Titre Stylisé */}
                    <div className="flex flex-col">
                        <span className="text-2xl font-black italic uppercase tracking-tighter text-slate-200 group-hover:text-white transition-colors">
                            {name}
                        </span>
                        <div className="h-0.5 w-0 group-hover:w-full bg-blue-500 transition-all duration-500 rounded-full" />
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-slate-500 group-hover:text-slate-300 leading-relaxed transition-colors">
                    {description}
                </p>
            </div>

            {/* Détail visuel : Badge ID discret */}
            <div className="absolute bottom-4 right-8 opacity-20 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-800 group-hover:text-blue-900 transition-colors">
                    Tech_Stack
                </span>
            </div>
        </motion.div>
    )
}