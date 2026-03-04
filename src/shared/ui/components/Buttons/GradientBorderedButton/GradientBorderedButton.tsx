import { ReactNode } from 'react'
import { TextGradient } from '../../TextGradient/TextGradient'

export const GradientBorderedButton = ({
    from,
    to,
    className,
    roundedFull = false,
    children,
}: {
    from: string
    to: string
    roundedFull: boolean
    className?: string
    children: ReactNode
}) => (
    <button
        className={`${roundedFull ? 'rounded-full' : 'rounded-lg'} p-px`}
        style={{ background: `linear-gradient(to right, ${from}, ${to})` }}
    >
        <span className={`block bg-[#06072b] ${className}`}>
            <TextGradient from={from} to={to} className='flex items-center gap-2'>{children}</TextGradient>
        </span>
    </button>
)
