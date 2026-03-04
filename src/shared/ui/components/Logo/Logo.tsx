import Link from 'next/link'
import { TextGradient } from '../TextGradient/TextGradient'
import { Gwendolyn } from 'next/font/google'

const gwendolyn = Gwendolyn({
  weight: "400",
  variable: '--font-gwendolyn',
  style: 'normal',
  subsets: ['latin'],
});

export const Logo = () => (
  <Link href="/" className="font-bold text-xl">
    <TextGradient className={`font-(--font-gwendolyn)`} from='#34C934' to='#2247FF' fontFamily={`var(${gwendolyn.variable})`}>Henri Sylvain</TextGradient>
  </Link>
)
