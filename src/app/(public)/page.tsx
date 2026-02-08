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
import { Archive, Rocket } from 'lucide-react'
import { SocialIcon } from 'react-social-icons'
import { CourseCard } from '@/ui/components/cards/CourseCard/CourseCard'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/ui/terminal'
import { AchievementCard } from '@/ui/components/Achievements/AchievementCard'


export default function HomePage() {
  const { data: parcours } = useParcours()
  const { data: achievements } = useAchievements()
  const { data: stacks } = useStacks()

  return (
    <>
      <Hero id="home" >

        <div
          className='grid grid-cols-1 lg:grid-cols-2 gap-2 mt-10'
        >
          {/* Social Media link */}
          <motion.div
            className='flex flex-row lg:flex-col'
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
            initial={{ y: -50, opacity: 0 }} // Changé de -100% à -50 pour un effet plus doux
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 max-w-3xl"
          >
            {/* Badge */}
            <div className='w-fit p-px bg-linear-to-r from-violet-500 to-blue-700 rounded-full shadow-lg'>
              <div className='bg-white dark:bg-slate-900 rounded-full transition duration-300'>
                <div className='py-1 px-4 bg-linear-to-r from-violet-500 to-blue-700 bg-clip-text text-transparent text-sm font-bold flex items-center gap-2'>
                  <Rocket size={20} className='text-violet-500'/>
                  <LoadText keyName="hero.badge" />
                </div>
              </div>
            </div>

            {/* Titre Principal */}
            <h1 className="text-5xl md:text-7xl leading-tight font-extrabold tracking-tight">
              Bonjour, je suis{" "}
              <TextGradient from="#2247FF" to="#4E1365">
                <LoadText keyName="hero.fullname" />
              </TextGradient>
            </h1>

            {/* Description */}
            <p className='text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed'>
              Je suis un designer UI/UX et Développeur Fullstack spécialisé dans la création
              d'applications mobiles, desktop et web haute performance.
              Je transforme vos idées complexes en produits intuitifs.
            </p>

            {/* Call to Action */}
            <div className="mt-4">
              <GradientBorderedButton
                from='#2247FF'
                to='#4E1365'
                className='flex items-center gap-2 rounded-full px-6 py-3 bg-white dark:bg-slate-950 hover:bg-transparent hover:text-white transition-all duration-300 group'
                roundedFull={true}
              >
                <Archive size={18} className='text-blue-600 group-hover:text-white transition-colors' />
                <span className="font-semibold">Découvrir mes réalisations</span>
              </GradientBorderedButton>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center items-center w-full h-full">
          {/* Terminal components */}
          <Terminal className="text-lg md:text-xl shadow-blue-500/10">
            <TypingAnimation delay={0}>$ whois</TypingAnimation>

            <AnimatedSpan delay={1800} className="text-blue-400 font-bold tracking-tight">
              Henri Sylvain AHANTO
            </AnimatedSpan>

            <AnimatedSpan delay={1800} className="text-slate-500 text-sm">
                // Fullstack Developer & UI Designer
            </AnimatedSpan>
          </Terminal>
        </div>
      </Hero>

      <Section
        id="mycourses"
        title="Mon Parcours"
        from='#2247FF'
        to='#4E1365'
        cta={
          <motion.div
            whileHover={{ scale: 1.05 }}
          >
            <Link
              href="/mycourses"
              className="relative inline-flex items-center justify-center px-6 py-2.5 font-semibold text-white transition-all duration-300 
               /* Light Mode: Fond sombre profond avec éclat */
               bg-slate-950 hover:bg-slate-900 
               /* Dark Mode: Utilise un bleu/violet très sombre pour plus de profondeur */
               dark:bg-blue-950/30 dark:hover:bg-blue-900/50 
               rounded-full group overflow-hidden border border-white/10"
            >
              {/* Effet de dégradé subtil au survol (Background Glow) */}
              <div className="absolute inset-0 w-full h-full transition-all duration-300 opacity-0 group-hover:opacity-20 bg-linear-to-r from-[#2247FF] to-[#4E1365]"></div>

              {/* Bordure animée ou lueur interne */}
              <span className="relative flex items-center gap-2">
                <LoadText keyName="hero.cta_courses" /> {/* Ou ton texte actuel */}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>

              {/* Petite lueur diffuse en mode Dark uniquement */}
              <div className="absolute -inset-1 bg-linear-to-r from-[#2247FF] to-[#4E1365] rounded-full blur opacity-0 group-hover:opacity-30 dark:group-hover:opacity-40 transition duration-500"></div>
            </Link>
          </motion.div>
        }
      >
        <div className="grid lg:grid-cols-3 gap-6">
          {parcours
            .filter(p => p.is_pinned)
            .slice(0, 3)
            .map((p, index) => (
              <motion.div
                key={p.id}
                // Animation d'entrée (cascade)
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}

                // Animation au survol (comme sur l'image)
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="h-full"
              >
                <CourseCard
                  title={p.title}
                  description={p.description}
                  period={p.period}
                  location={p.location}
                  tags={p.tags}
                />
              </motion.div>
            ))}
        </div>
      </Section>

      <Section id="stack" title="My Stack" from='#2247FF' to='#4E1365' className='overflow-visible py-7 flex items-center'>
        <StackCarousel stacks={stacks} />
      </Section>

      <Section
      id='achievements'
        from='#2247FF'
        to='#4E1365'
        title="Mes Réalisations"
        cta={<a href="/achievements" className="font-bold hover:underline">Découvrir mes projets</a>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.slice(0, 6).map(a => (
            <AchievementCard key={a.id} project={a} />
          ))}
        </div>
      </Section>

      <Section title="Contact Me" id='contact' from='#2247FF' to='#4E1365' >
        <div className="grid md:grid-cols-2 gap-12">
          <MyStaticInfo />
          <ContactForm />
        </div>
      </Section>
    </>
  )
}
