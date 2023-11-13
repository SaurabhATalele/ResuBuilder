import './globals.css'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ResuBuilder',
  description: 'Create your resume in minutes with ResuBuilder',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextTopLoader color='#BA68C8' showSpinner={false} />
        {children}
        </body>
    </html>
  )
}
