import Link from 'next/link'

interface MenuProps {
  items: { label: string; href: string }[]
}

export const Menu = ({ items }: MenuProps) => (
  <nav className="hidden md:flex gap-6">
    {items.map(item => (
      <Link key={item.href} href={item.href} className="hover:underline">
        {item.label}
      </Link>
    ))}
  </nav>
)
