import { ReactNode } from 'react'

export const FakeButton = ({
    borderColor,
    bgColor,
    className,
    children,
}: {
    borderColor: string
    bgColor: string
    className?: string
    children: ReactNode
}) => (
    <span
        style={{ borderColor, backgroundColor: bgColor }}
        className={`px-4 py-2 border rounded-full text-sm ${className} `}
    >
        {children}
    </span>
)
