import { ReactNode } from 'react'

export const Hero = ({ children, id }: { children: ReactNode, id?: string }) => (
  <section id={id} className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
    {children}
  </section>
)
