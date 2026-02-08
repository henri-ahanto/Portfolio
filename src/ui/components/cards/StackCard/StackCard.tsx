'use client'

import { Stack } from '@/domain/entities/Stacks'
import { motion } from 'framer-motion'

export const StackCard = ({ name, logo_url, description }: Stack) => {
    return (
        <motion.div 
            // Animation d'entrée
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            
            // Animation au survol / touché
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            
            className="group relative mx-4 my-2 py-6 px-6 min-h-[120px] rounded-2xl 
                       bg-linear-to-br from-white/70 to-white/40 
                       dark:from-[#0b0a1f]/70 dark:to-[#0b0a1f]/40 
                       backdrop-blur-md border border-black/10 dark:border-white/10 
                       shadow-sm hover:shadow-xl transition-all 
                       flex flex-col justify-center gap-3"
        >
            {/* Glow on hover - Optimisé pour mobile (moins intense) */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-indigo-500/20 to-purple-500/20 blur-xl -z-10" />

            <div className="relative z-10 flex flex-col gap-3">
                <div className='flex items-center lg:flex-row flex-col gap-4'>
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center shadow-inner border border-black/5 dark:border-white/10">
                        <img
                            src={logo_url}
                            alt={name}
                            className="w-8 h-8 object-contain transition-transform group-hover:scale-110"
                        />
                    </div>

                    <span className="block text-xl md:text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                        {name}
                    </span>
                </div>
                
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}