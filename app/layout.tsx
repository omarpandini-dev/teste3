import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Login - Sistema',
  description: 'Acesse o sistema com seu telefone e senha',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
