import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from './context/AuthContext'

export const metadata: Metadata = {
  title: 'Game-Changing Z7 Neck Bracket for Sports Whiplash Safety',
  description: 'Description: Discover how the Z7 Neck Bracket protects athletes from whiplash. Learn why it’s the ultimate game-changer in sports safety today.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
