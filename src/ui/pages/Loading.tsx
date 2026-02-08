'use client'
import { motion } from "framer-motion"

export const LoadingPage = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508] overflow-hidden">
            {/* Orbes de lumière en arrière-plan pour la profondeur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-violet-600/10 blur-[100px] rounded-full delay-700" />

            <div className="relative flex flex-col items-center gap-6">
                {/* Spinner Minimaliste Animé */}
                <div className="relative w-16 h-16">
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-t-2 border-l-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    />
                    <motion.span
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 rounded-full border-b-2 border-r-2 border-violet-500 opacity-50"
                    />
                </div>

                {/* Texte de chargement avec Gradient Animé */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <h2 className="text-xl font-black tracking-[0.3em] uppercase bg-linear-to-r from-blue-400 via-white to-violet-400 bg-clip-text text-transparent animate-gradient-x">
                        Chargement
                    </h2>
                    
                    {/* Barre de progression subtile */}
                    <div className="w-32 h-[2px] bg-white/5 mt-4 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 1.5, 
                                ease: "easeInOut" 
                            }}
                            className="w-full h-full bg-linear-to-r from-transparent via-blue-500 to-transparent"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Signature discrète en bas */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 text-[10px] uppercase tracking-widest text-white"
            >
                Système d'administration v4.0
            </motion.p>
        </div>
    )
}