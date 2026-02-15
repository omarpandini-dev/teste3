export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { user?: string }
    const user = String(body.user || '').replace(/\D/g, '').trim()

    if (!user) {
      return new Response(JSON.stringify({ ok: false, message: 'Informe o telefone.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const credentials = Buffer.from(
      'user_admin:d3c07562aa4f6753629e8b72bbf03984579c0d33b9b01e4a15936b260935bcb4',
    ).toString('base64')

    const response = await fetch(
      'https://n8n-fila-n8n-start.cr61qk.easypanel.host/webhook/fd69d6de-c986-484a-abc8-f11926a7a1e5',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({ user }),
      },
    )

    if (!response.ok) {
      return new Response(JSON.stringify({ ok: false, message: 'Falha ao enviar.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ ok: false, message: 'Erro interno.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
