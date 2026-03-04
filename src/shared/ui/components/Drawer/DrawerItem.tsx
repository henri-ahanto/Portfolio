'use client'

import Link from 'next/link'


export const DrawerItem = ({ href, label, icon, active, onClick }: any) => (
    <Link
        href={href}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
            ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400 font-bold'
            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
    >
        {icon}
        <span>{label}</span>
    </Link>
)