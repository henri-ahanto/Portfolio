import { ReactNode } from 'react'

export const TextGradient = ({
  from,
  to,
  children,
  fontFamily,
  className,
}: {
  from: string
  to: string
  fontFamily?: string
  className?: string
  children: ReactNode
}) => (
  <span
  className={className}
    style={{
      background: `linear-gradient(to right, ${from}, ${to})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontFamily: fontFamily
    }}
  >
    {children}
  </span>
)
