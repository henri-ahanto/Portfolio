import { ReactNode } from 'react'

export const Hero = ({ children }: { children: ReactNode }) => (
  <section className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
    {children}
  </section>
)
