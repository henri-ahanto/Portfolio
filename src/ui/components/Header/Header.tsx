'use client'

import { Menu as MenuIcon } from 'lucide-react'
import { Logo } from '../Logo/Logo'
import { ThemeButton } from '../ThemeButton/ThemeButton'
import { Drawer } from '../Drawer/Drawer'
import { useDrawer } from '@/domain/hooks/useDrawer/useDrawer'
import '../../../app/globals.css';
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DrawerItem } from '../Drawer/DrawerItem'
import { Home, BookOpen, Layers, Mail } from 'lucide-react'

export const Header = () => {
  const { open, toggle, closeDrawer } = useDrawer()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Détection de la section active
      const sections = items.map(item => item.position);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const items = [
    { label: 'Accueil', href: '/', position: 'home', icon: <Home size={18} /> },
    { label: 'Parcours', href: '/#mycourses', position: 'mycourses', icon: <BookOpen size={18} /> },
    { label: 'Stack', href: '/#stack', position: 'stack', icon: <Layers size={18} /> },
    { label: 'Contact', href: '/#contact', position: 'contact', icon: <Mail size={18} /> },
  ]

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-md dark:bg-(--foreground)/60 border-b border-black/5 dark:border-white/5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      <header className="max-w-[1550px] mx-auto flex items-center justify-between px-6 py-4">

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="cursor-pointer"
        >
          <Logo />
        </motion.div>

        <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
          {items.map((item, index) => {
            const sectionId = item.position;
            const isActive = activeSection === sectionId;

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-5 py-3 text-[0.95rem] font-medium tracking-tight rounded-xl transition-all duration-300 space-nowrap dark:text-(--foreground) ${isActive
                    ? 'dark:text-white dark:bg-indigo-500/10 bg-indigo-500/60 '
                    : 'dark:text-white/70 hover:bg-indigo-300'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="hidden lg:flex gap-4">
          <ThemeButton />
        </div>

        <button onClick={toggle} className="lg:hidden">
          <MenuIcon />
        </button>

        <Drawer open={open} onClose={closeDrawer}>
          <nav className="flex flex-col">
            {/* Conteneur de liens avec animation en cascade */}
            <div className="space-y-1 mb-6">
              {items.map((i) => (
                <DrawerItem
                  key={i.href}
                  href={i.href}
                  label={i.label}
                  icon={i.icon} // Assure-toi que tes items ont une icône Lucide
                  onClick={closeDrawer}
                />
              ))}
            </div>

            {/* Section séparée pour les actions système */}
            <div className="mt-4 pt-6 border-t border-slate-200 dark:border-white/5">
              <div className="px-4 py-2 flex items-center justify-between bg-slate-100 dark:bg-white/5 rounded-2xl">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest italic">Thème</span>
                <ThemeButton />
              </div>
            </div>
          </nav>
        </Drawer>
      </header>
    </motion.header>
  )
}
