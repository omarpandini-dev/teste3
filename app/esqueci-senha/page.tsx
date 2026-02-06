import Link from 'next/link'

export default function EsqueciSenhaPage() {
  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Esqueci minha senha</h1>
          <p>Em breve você poderá redefinir sua senha por aqui.</p>
        </div>
        <Link href="/" className="login-forgot" style={{ alignSelf: 'center', marginTop: 16 }}>
          Voltar ao login
        </Link>
      </div>
    </main>
  )
}
