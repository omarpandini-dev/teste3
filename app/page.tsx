'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const PHONE_VALID = '96552057'
const PASSWORD_VALID = 'admin'

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const phoneClean = phone.replace(/\D/g, '')
    if (phoneClean !== PHONE_VALID || password !== PASSWORD_VALID) {
      setError('Telefone ou senha incorretos. Tente novamente.')
      return
    }

    router.push('/home')
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Entrar</h1>
          <p>Informe seu telefone e senha para acessar o sistema</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <label className="login-label">
            Telefone
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: 96552057"
              className="login-input"
              autoComplete="tel"
              required
            />
          </label>

          <label className="login-label">
            Senha
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="login-input"
              autoComplete="current-password"
              required
            />
          </label>

          <Link href="/esqueci-senha" className="login-forgot">
            Esqueci minha senha
          </Link>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </main>
  )
}
