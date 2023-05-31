import './globals.css'
import { Inter } from 'next/font/google'

import { Nav, Provider } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptetheus',
  description: 'Discover and share AI Prompts!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>  

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
