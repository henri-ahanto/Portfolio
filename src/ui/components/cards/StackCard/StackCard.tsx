'use client'

import { Stack as Stack } from '@/domain/entities/Stacks'

export const StackCard = ({ name, logo_url, description }: Stack) => {

    console.log(logo_url)
    return (
        <div className="group relative mx-4 py-4 px-6 h-30 items-start rounded-2xl bg-linear-to-br from-white/70 to-white/40 dark:from-[#0b0a1f]/70 dark:to-[#0b0a1f]/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-center gap-2">

            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-indigo-500/20 to-purple-500/20 blur-xl" />

            <div className="relative z-10 flex flex-col items-left gap-2">
                <div className='flex items-center gap-3'>
                    <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                        <img
                            src={logo_url}
                            alt={name}
                            className="w-7 h-7 object-contain"
                        />
                    </div>

                    <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {name}
                    </span>
                </div>
                <p>
                    {description}
                </p>
            </div>
        </div>
    )
}
