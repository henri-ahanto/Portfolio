import { ReactNode } from 'react'
import { TextGradient } from '../TextGradient/TextGradient'

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
        <h2 className="text-4xl font-bold mb-12 text-center"><TextGradient from={from} to={to}>{title}</TextGradient></h2>
        {children}
        {cta && <div className="mt-12">{cta}</div>}
    </section>
)
