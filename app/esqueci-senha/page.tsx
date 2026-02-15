'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function EsqueciSenhaPage() {
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setStatus('idle')
    setMessage('')

    const user = phone.replace(/\D/g, '').trim()
    if (!user) {
      setStatus('error')
      setMessage('Informe um número de telefone válido.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      })

      if (!response.ok) {
        throw new Error('Falha ao enviar solicitação.')
      }

      setStatus('success')
      setMessage('Solicitação enviada. Verifique seu telefone.')
      setPhone('')
    } catch {
      setStatus('error')
      setMessage('Não foi possível enviar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Esqueci minha senha</h1>
          <p>Informe seu número de telefone para recuperar o acesso.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {message && (
            <div className={status === 'success' ? 'login-success' : 'login-error'} role="alert">
              {message}
            </div>
          )}

          <label className="login-label">
            Número de telefone
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Ex: 554797934627"
              className="login-input"
              autoComplete="tel"
              required
              disabled={loading}
            />
          </label>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>

        <Link href="/" className="login-forgot" style={{ alignSelf: 'center', marginTop: 16 }}>
          Voltar ao login
        </Link>
      </div>
    </main>
  )
}
