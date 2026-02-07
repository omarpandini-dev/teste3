import { NextRequest, NextResponse } from 'next/server'

// URL exata que funciona no Postman. Pode ser sobrescrita por .env.local (LOGIN_API_URL).
const DEFAULT_LOGIN_URL =
  'https://n8n-fila-n8n-start.cr61qk.easypanel.host/webhook/5646273c-9d13-4143-8efc-c66ce80b542a'
const LOGIN_API_URL = (process.env.LOGIN_API_URL || DEFAULT_LOGIN_URL).trim().replace(/\/+$/, '')
const LOGIN_API_USER = process.env.LOGIN_API_USER || 'user_admin'
const LOGIN_API_PASSWORD =
  process.env.LOGIN_API_PASSWORD ||
  'd3c07562aa4f6753629e8b72bbf03984579c0d33b9b01e4a15936b260935bcb4'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const user = typeof body.user === 'string' ? body.user.trim() : ''
    const password = typeof body.password === 'string' ? body.password : ''

    if (!user || !password) {
      return NextResponse.json(
        { ok: false, msg: 'Informe usuário (telefone) e senha.' },
        { status: 400 }
      )
    }

    const credentials = Buffer.from(
      `${LOGIN_API_USER}:${LOGIN_API_PASSWORD}`
    ).toString('base64')

    const res = await fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
        'User-Agent': 'PostmanRuntime/7.32.3',
      },
      body: JSON.stringify({
        tpOperacao: 'LOGIN',
        user,
        password,
      }),
      cache: 'no-store',
    })

    const rawBody = await res.text()

    if (!res.ok) {
      if (res.status === 404) {
        console.error('[Login API] 404 - URL chamada:', LOGIN_API_URL)
        console.error('[Login API] Resposta do servidor:', rawBody || '(vazio)')
      }
      let msg = `Erro ao comunicar com o servidor (${res.status}). Tente novamente.`
      try {
        const errData = JSON.parse(rawBody) as { msg?: string }
        if (errData.msg) msg = errData.msg
      } catch {
        // mantém msg com o status
      }
      return NextResponse.json({ ok: false, msg }, { status: 502 })
    }

    const data = JSON.parse(rawBody) as {
      msg?: string
      idRetorno?: string
    }

    const isValid = data.idRetorno === 'S'
    return NextResponse.json({
      ok: isValid,
      msg: data.msg || (isValid ? 'Login válido' : 'Usuário ou senha inválidos'),
    })
  } catch {
    return NextResponse.json(
      { ok: false, msg: 'Erro inesperado. Tente novamente.' },
      { status: 500 }
    )
  }
}
