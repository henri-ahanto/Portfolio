'use client'

import { Menu as MenuIcon } from 'lucide-react'
import { Logo } from '../Logo/Logo'
import { ThemeButton } from '../ThemeButton/ThemeButton'
import { Drawer } from '../Drawer/Drawer'
import { useDrawer } from '@/domain/hooks/useDrawer/useDrawer'
import '../../../app/globals.css';
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DrawerItem } from '../Drawer/DrawerItem'
import { navItems } from '@/domain/const/Navigation'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const { open, toggle, closeDrawer } = useDrawer()
  const path = usePathname()
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);


      // Détection de la section active
      const sections = navItems.map(item => item.position);
      for (const section of sections) {

        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // On considère la section active si elle occupe le haut de l'écran (offset de 100px)
          if (rect.top <= 50 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }

        if (path.includes(section)) {
          setActiveSection(section)
        }
      }


    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérification immédiate au montage
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ${isScrolled ? 'dark:bg-black/80 bg-white/80' : 'dark:bg-transparent bg-transparent'
        } border-b border-black/5 dark:border-white/5`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      <div className="max-w-[1550px] mx-auto flex items-center justify-between px-6 py-4">

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <Logo />
        </motion.div>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <DrawerItem
                key={item.position}
                href={item.href}
                label={item.label}
                icon={<Icon size={18} />}
                // ICI : On marque l'item comme actif
                active={activeSection === item.position}
                onClick={closeDrawer}
              />
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <ThemeButton />
          </div>
          <button onClick={toggle} className="lg:hidden p-2 text-slate-500 hover:text-blue-500 transition-colors">
            <MenuIcon />
          </button>
        </div>

        {/* Navigation Mobile (Drawer) */}
        <Drawer open={open} onClose={closeDrawer}>
          <nav className="flex flex-col h-full">
            <div className="space-y-1 mb-6 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <DrawerItem
                    key={item.position}
                    href={item.href}
                    label={item.label}
                    icon={<Icon size={18} />}
                    // ICI AUSSI : On marque l'item comme actif dans le menu mobile
                    active={activeSection === item.position}
                    onClick={closeDrawer}
                  />
                )
              })}
            </div>

            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5">
              <div className="px-4 py-3 flex items-center justify-between bg-slate-100 dark:bg-white/5 rounded-2xl border border-transparent dark:border-white/5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
                  Interface
                </span>
                <ThemeButton />
              </div>
            </div>
          </nav>
        </Drawer>
      </div>
    </motion.header>
  )
}