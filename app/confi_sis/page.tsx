import Link from 'next/link'

export default function ConfiguracoesPage() {
  return (
    <main className="home-page">
      <aside className="home-menu" aria-label="Menu principal">
        <div className="home-menu__brand">
          <span className="home-menu__logo" aria-hidden="true">
            <img src="logo.png" width={100} alt="" srcSet="" />
          </span>
        </div>
        <nav className="home-menu__nav">
          <Link className="home-menu__item" href="/home">
            Home
          </Link>
          <Link className="home-menu__item active" href="/confi_sis">
            Configurações
          </Link>
          <Link className="home-menu__item" href="/agendas">
            Agendas
          </Link>
        </nav>
      </aside>

      <section className="home-main">
        <div className="home-content">
          <p>Teste configurações</p>
        </div>
      </section>
    </main>
  )
}
