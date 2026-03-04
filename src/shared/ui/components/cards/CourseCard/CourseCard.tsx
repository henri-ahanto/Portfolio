'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Terminal } from 'lucide-react'

type CourseCardProps = {
  title: string
  description: string
  period?: string
  location?: string
  tags?: string[]
}

export const CourseCard = ({
  title,
  description,
  period,
  location,
  tags = [],
}: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-4xl border border-white/5 bg-slate-900/40 backdrop-blur-xl p-8 transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* Accent Line - S'illumine au survol */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-1 bg-blue-500/20 group-hover:h-2/3 group-hover:bg-blue-500 transition-all duration-500 rounded-r-full" />

      {/* Glow effect arrière-plan */}
      <div className="absolute -right-20 -top-20 h-40 w-40 bg-blue-600/10 blur-[80px] group-hover:bg-blue-600/20 transition-all duration-700" />

      <div className="relative z-10 space-y-4">
        {/* Header : Title & Period */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white leading-none group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            {location && (
              <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <MapPin size={12} className="text-blue-500/50" />
                {location}
              </div>
            )}
          </div>

          {period && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest italic group-hover:border-blue-500/20 group-hover:text-blue-400 transition-all">
              <Calendar size={12} />
              {period}
            </div>
          )}
        </div>

        {/* Description */}
        <div
          className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Footer : Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-black/40 text-slate-500 border border-white/5 group-hover:border-blue-500/10 group-hover:text-blue-400/80 transition-all"
              >
                <Terminal size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Corner Icon - Discret mais pro */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-10 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
        <Terminal size={40} className="text-white" />
      </div>
    </motion.div>
  )
}