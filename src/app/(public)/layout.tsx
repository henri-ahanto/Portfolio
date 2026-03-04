import { Header } from '@/shared/ui/components/Header/Header'
import { Footer } from '@/shared/ui/components/Footer/Footer'
import { GoogleTranslate } from '@/shared/i18n/GoogleTranslate'
import './page.css'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <GoogleTranslate />
      <main className="max-w-[1550px] mx-auto px-6">{children}</main>
      <Footer />
    </>
  )
}
