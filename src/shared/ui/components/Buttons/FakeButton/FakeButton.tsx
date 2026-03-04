import { ReactNode } from 'react'

export const FakeButton = ({
    className,
    children,
}: {
    className?: string
    children: ReactNode
}) => (
    <span
        className={`px-4 py-2 border rounded-full text-sm ${className}`}
    >
        {children}
    </span>
)
