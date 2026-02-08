'use client'

import { Mail, Phone, MapPin, UserCircle } from 'lucide-react'
import { LoadText } from '../Loaders/LoadText/LoadText'
import { motion } from 'framer-motion'

export const MyStaticInfo = () => {
  const contactItems = [
    { key: "contact.email", icon: Mail, label: "Email" },
    { key: "contact.phone", icon: Phone, label: "Téléphone" },
    { key: "contact.address", icon: MapPin, label: "Localisation" },
  ]

  return (
    <div className="space-y-8">
      {/* Titre de la section */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <UserCircle size={20} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
          Informations <span className="text-blue-500">sur moi</span>
        </h2>
      </div>

      {/* Liste des informations */}
      <div className="flex flex-col gap-4">
        {contactItems.map((item, index) => (
          <motion.div 
            key={item.key}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-500"
          >
            {/* Icone avec effet Glow au survol */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/40 border border-white/5 text-slate-500 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all">
              <item.icon size={18} />
            </div>

            {/* Texte */}
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-0.5">
                {item.label}
              </span>
              <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                <LoadText keyName={item.key} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}