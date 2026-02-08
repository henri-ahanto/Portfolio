'use client'

import { Hero } from '@/ui/components/Hero/Hero'
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
import { SocialIcon } from 'react-social-icons'
import { CourseCard } from '@/ui/components/cards/CourseCard/CourseCard'
import Link from 'next/link'
import { motion } from 'framer-motion'


export default function HomePage() {
  const { data: parcours } = useParcours()
  const { data: achievements } = useAchievements()
  const { data: stacks } = useStacks()

  return (
    <>
      <Hero id="home">

        <div
          className='flex  gap-2'
        >
          {/* Social Media link */}
          <motion.div
            className='flex flex-col '
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className='p-2'>
              <SocialIcon url='https://www.linkedin.com/in/henri-sylvain-ahanto-911477286' />
            </div>
            <div className='p-2'>
              <SocialIcon url='https://www.github.com/henri-ahanto' />
            </div>
            <div className='p-2'>
              <SocialIcon url='https://web.facebook.com/profile.php?id=61581732275354&sk=about' />
            </div>
            <div className='p-2'>
              <SocialIcon url='https://web.whatsapp.com/0153465849' />
            </div>
            <div className='p-2'>
              <SocialIcon url='https://www.youtube.com/@DigitalLifeAcademy911' />
            </div>

          </motion.div>

          {/* Informations section */}
          <motion.div 
          initial={{ y: '-100%', opacity: 0}}
          animate={{ y: 0, opacity: 1}}
          transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6">
            <div className='w-fit p-px bg-linear-to-r from-(--violet) to-blue-700 rounded-full'>
              <div
                className='bg-(--bg-theme) dark:bg-(--bg-foreground)/90 rounded-full transition duration-300'
              >
                <div
                  className='py-1 px-3 bg-linear-to-r from-(--violet) to-blue-700 bg-clip-text text-transparent text-base text-bold border-px'
                >
                  <LoadText keyName="hero.badge" />
                </div>
              </div>
            </div>

            <h1 className="text-[48px] leading-tight font-bold">
              Bonjour je suis <TextGradient from="#2247FF" to="#4E1365" className=''>
                <LoadText keyName="hero.fullname" />
              </TextGradient>
            </h1>
            <p className='text-xl'>Je suis un designer UI/UX et Développeur Fullstack spécialisé dans la création d'applications mobiles, desktop et web haute performance. Je transforme vos idées complexes en produits intuitifs</p>
            <div>
              <GradientBorderedButton from={'#2247FF'} to={'#4E1365'} className='p-1 flex rounded-full px-3 py-2 hover:bg-[#0e0f44] transition-colors duration-300 group bg-white dark:bg-(--bg-foreground)' roundedFull={true}>
                <ArchiveIcon size={18} color='#2247FF' className='group-hover:text-white' /> Découvrir mes réalisations
              </GradientBorderedButton>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <div className="w-[420px] h-[420px] bg-linear-to-br from-purple-500  to-blue-500 rounded-full" />
        </div>
      </Hero>

      <Section id="mycourses" title="Mon Parcours" from='#2247FF' to='#4E1365' cta={
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

      <Section id="stack" title="My Stack" from='#2247FF' to='#4E1365' className='overflow-visible py-7 flex items-center'>
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
