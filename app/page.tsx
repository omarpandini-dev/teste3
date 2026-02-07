'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = phone.replace(/\D/g, '').trim()
      if (!user) {
        setError('Informe o telefone.')
        return
      }

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password }),
      })

      const data = (await res.json()) as { ok: boolean; msg: string }

      if (data.ok) {
        router.push('/home')
        return
      }

      setError(data.msg || 'Usuário ou senha inválidos.')
    } catch {
      setError('Erro ao conectar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-logo" aria-hidden>
          <img src="/logo.png" alt="" />
        </div>
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
              placeholder="Ex: 554797934627"
              className="login-input"
              autoComplete="tel"
              required
              disabled={loading}
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
              disabled={loading}
            />
          </label>

          <Link href="/esqueci-senha" className="login-forgot">
            Esqueci minha senha
          </Link>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  )
}
