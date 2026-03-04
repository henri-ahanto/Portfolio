import { ReactNode } from 'react'
import { TextGradient } from '../TextGradient/TextGradient'
import { ParticlesBg } from '../ParticlesBg/ParticlesBg'

export const Section = ({
    className,
    from,
    to,
    title,
    children,
    cta,
    id,
}: {
    title: string
    from: string
    to: string
    children: ReactNode
    cta?: ReactNode
    className?: string
    id?: string,
}) => (
    <section className="py-24" id={id}>
        {/* L'animation de fond */}
        <ParticlesBg />
        <div className="relative z-10 container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">
                <TextGradient from={from} to={to}>{title}</TextGradient>
            </h2>

            {children}

            {cta && <div className="mt-12 flex justify-center">{cta}</div>}
        </div>
    </section>
)
