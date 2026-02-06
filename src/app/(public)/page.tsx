'use client'

import { Hero } from '@/ui/components/Hero/Hero'
import { FakeButton } from '@/ui/components/Buttons/FakeButton/FakeButton'
import { TextGradient } from '@/ui/components/TextGradient/TextGradient'
import { GradientBorderedButton } from '@/ui/components/Buttons/GradientBorderedButton/GradientBorderedButton'
import { Section } from '@/ui/components/Section/Section'
import { LoadText } from '@/ui/components/Loaders/LoadText/LoadText'
import { useParcours } from '@/domain/hooks/useParcours/useParcours'
import { useAchievements } from '@/domain/hooks/useAchievements/useAchievements'
import { StackCarousel } from '@/ui/components/StackCarousel/StackCarousel'
import { useStacks } from '@/domain/hooks/useStacks/useStacks'
import { ContactForm } from '@/ui/components/Forms/ContactForm/ContactForm'
import { MyStaticInfo } from '@/ui/components/MyStaticInfo/MyStaticInfo'
import { ArchiveIcon } from 'lucide-react'
import { CourseCard } from '@/ui/components/cards/CourseCard/CourseCard'
import Link from 'next/link'

export default function HomePage() {
  const { data: parcours } = useParcours()
  const { data: achievements } = useAchievements()
  const { data: stacks } = useStacks()

  return (
    <>
      <Hero>
        <div className="flex flex-col gap-6">
          <FakeButton borderColor="#8b5cf6" bgColor="#1e1b4b" className='text-center w-fit'>
            <LoadText keyName="hero.badge" />
          </FakeButton>

          <h1 className="text-[48px] leading-tight font-bold">
            Bonjour je suis
            <TextGradient from="#2247FF" to="#4E1365">
              <LoadText keyName="hero.fullname" />
            </TextGradient>
          </h1>
          <p>Je suis un designer UI/UX et Développeur Fullstack spécialisé dans la création d'applications mobiles, desktop et web haute performance. Je transforme vos idées complexes en produits intuitifs</p>
          <div>
            <GradientBorderedButton from={'#2247FF'} to={'#4E1365'} className='p-1 flex rounded-full px-3 py-2 hover:bg-[#0e0f44] transition-colors duration-300 group' roundedFull={true}>
              <ArchiveIcon size={18} color='#2247FF' className='group-hover:text-white' /> Découvrir mes réalisations
            </GradientBorderedButton>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-[420px] h-[420px] bg-linear-to-br from-purple-500  to-blue-500 rounded-full" />
        </div>
      </Hero>

      <Section title="Mon Parcours" from='#2247FF' to='#4E1365' id="mycourses" cta={
        <div>
          <Link className='bg-blue-950 px-4 py-2 rounded-full hover:bg-blue-900' href="/mycourses">En savoir plus sur mon parcours</Link>
        </div>
      }>
        <div className="grid md:grid-cols-3 gap-6">
          {parcours.filter(p => p.is_pinned).slice(0, 3).map(p => (
            <CourseCard
              key={p.id}
              title={p.title}
              description={p.description}
              period={p.period}
              location={p.location}
              tags={p.tags}
            />

          ))}
        </div>
      </Section>

      <Section title="My Stack" from='#2247FF' to='#4E1365' className='overflow-visible py-7 flex items-center'>
        <StackCarousel stacks={stacks} />
      </Section>

      <Section from='#2247FF' to='#4E1365' title="Mes Réalisations" cta={<a href="/achievements">Découvrir mes projets</a>}>
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.filter(a => a.is_pinned).slice(0, 3).map(a => (
            <div key={a.id} className="border p-6 rounded-xl">
              <h3 className="font-bold">{a.title}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Contact Me" id='contact' from='' to='' >
        <div className="grid md:grid-cols-2 gap-12">
          <MyStaticInfo />
          <ContactForm />
        </div>
      </Section>
    </>
  )
}
