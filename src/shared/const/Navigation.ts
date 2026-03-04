import { Home, BookOpen, Layers, Mail, LucideIcon, Trophy } from "lucide-react"

export interface NavItem {
  label: string
  href: string
  position: string
  icon: LucideIcon // On stocke la référence du composant, pas le JSX
}

export const navItems: NavItem[] = [
  { label: 'Accueil', href: '/', position: 'home', icon: Home },
  { label: 'Parcours', href: '/#mycourses', position: 'mycourses', icon: BookOpen },
  { label: 'Stack', href: '/#stack', position: 'stack', icon: Layers },
  { label: 'Mes réalisations', href: '/#achievements', position: "achievements", icon: Trophy },
  { label: 'Contact', href: '/#contact', position: 'contact', icon: Mail },
]