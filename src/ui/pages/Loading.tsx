'use client'
import { motion } from "framer-motion"

export const LoadingPage = () => {
    return (
        <motion.section
            animate={{
                scale: [0.7, 1.3]
            }}
            transition={{
                duration: 1,
                ease: 'easeInOut',
                times: [0, 0.2, 0.4, 0.8, 1]
            }}

            // style={{
            //     textAlign: 'center',
            //     width: "100%",
            //     height: '100vh',
            // }}
             className="text-black text-bold w-full h-svh flex justify-center items-center">
                Loading
            </motion.section>
    )
}