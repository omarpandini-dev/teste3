'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

export default function HomePage() {
  const router = useRouter()
  const agendas = [
    {
      data: '12/02/2026',
      horario: '09:00',
      cliente: 'Ana Souza',
      telefone: '(47) 99123-4567',
      servico: 'Corte e Escova',
      valor: 'R$ 120,00',
    },
    {
      data: '12/02/2026',
      horario: '10:30',
      cliente: 'Bruno Lima',
      telefone: '(47) 98877-3322',
      servico: 'Barba',
      valor: 'R$ 60,00',
    },
    {
      data: '13/02/2026',
      horario: '14:00',
      cliente: 'Carla Menezes',
      telefone: '(47) 99771-0044',
      servico: 'Coloração',
      valor: 'R$ 220,00',
    },
    {
      data: '14/02/2026',
      horario: '16:30',
      cliente: 'Diego Martins',
      telefone: '(47) 99220-1199',
      servico: 'Corte Masculino',
      valor: 'R$ 75,00',
    },
  ]

  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [service, setService] = useState('')

  const filteredAgendas = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const start = startDate ? new Date(`${startDate}T00:00:00`) : null
    const end = endDate ? new Date(`${endDate}T23:59:59`) : null

    function parseAgendaDate(value: string) {
      const [day, month, year] = value.split('/')
      return new Date(`${year}-${month}-${day}T00:00:00`)
    }

    return agendas.filter((agenda) => {
      if (normalizedSearch) {
        const haystack = `${agenda.cliente} ${agenda.telefone}`.toLowerCase()
        if (!haystack.includes(normalizedSearch)) {
          return false
        }
      }

      if (service) {
        const normalizedService = agenda.servico.toLowerCase()
        if (!normalizedService.includes(service)) {
          return false
        }
      }

      if (start || end) {
        const agendaDate = parseAgendaDate(agenda.data)
        if (start && agendaDate < start) {
          return false
        }
        if (end && agendaDate > end) {
          return false
        }
      }

      return true
    })
  }, [agendas, search, service, startDate, endDate])

  const totalValue = useMemo(() => {
    return filteredAgendas.reduce((sum, agenda) => {
      const numeric = Number(
        agenda.valor.replace('R$', '').replace(/\./g, '').replace(',', '.').trim(),
      )
      return sum + (Number.isNaN(numeric) ? 0 : numeric)
    }, 0)
  }, [filteredAgendas])

  const serviceChart = useMemo(() => {
    const totals = filteredAgendas.reduce<Record<string, number>>((acc, agenda) => {
      const key = agenda.servico
      const numeric = Number(
        agenda.valor.replace('R$', '').replace(/\./g, '').replace(',', '.').trim(),
      )
      acc[key] = (acc[key] || 0) + (Number.isNaN(numeric) ? 0 : numeric)
      return acc
    }, {})

    return Object.entries(totals)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
  }, [filteredAgendas])

  const maxChartValue = serviceChart[0]?.value ?? 0

  function handleLogout() {
    router.push('/')
  }

  return (
    <main className="home-page">
      <aside className="home-menu" aria-label="Menu principal">
        <div className="home-menu__brand">
          <span className="home-menu__logo" aria-hidden="true">
            <img src="logo.png" width={100} alt="" srcSet="" />
          </span>
        </div>
        <nav className="home-menu__nav">
          <Link className="home-menu__item active" href="/home">
            Home
          </Link>
          <Link className="home-menu__item" href="/confi_sis">
            Configurações
          </Link>
          <Link className="home-menu__item" href="/agendas">
            Agendas
          </Link>
          <button className="home-logout" type="button" onClick={handleLogout}>
            Sair
          </button>
        </nav>
      </aside>

      <section className="home-main">
        <div className="home-content">
          <div className="home-header">
            <div>
              <h1>Próximas Agendas</h1>
              <p>Visualize e filtre seus atendimentos confirmados.</p>
            </div>
            <button className="home-action" type="button">
              Nova agenda
            </button>
          </div>

          <div className="home-filters">
            <label className="home-filter">
              Buscar cliente
              <input
                type="text"
                placeholder="Nome ou telefone"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <label className="home-filter">
              Data inicial
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </label>
            <label className="home-filter">
              Data final
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </label>
            <label className="home-filter">
              Serviço
              <select
                value={service}
                onChange={(event) => setService(event.target.value)}
              >
                <option value="">Todos</option>
                <option value="corte">Corte</option>
                <option value="barba">Barba</option>
                <option value="coloração">Coloração</option>
                <option value="escova">Escova</option>
              </select>
            </label>
          </div>

          <div className="home-table">
            <table>
              <thead>
                <tr>
                  <th>Data Agenda</th>
                  <th>Horário</th>
                  <th>Cliente</th>
                  <th>Telefone</th>
                  <th>Serviço</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgendas.map((agenda) => (
                  <tr key={`${agenda.data}-${agenda.horario}-${agenda.cliente}`}>
                    <td>{agenda.data}</td>
                    <td>{agenda.horario}</td>
                    <td>{agenda.cliente}</td>
                    <td>{agenda.telefone}</td>
                    <td>{agenda.servico}</td>
                    <td>{agenda.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredAgendas.length === 0 && (
              <div className="home-table__empty">Nenhuma agenda encontrada.</div>
            )}
          </div>

          <div className="home-summary">
            <span>Total das agendas:</span>
            <strong>
              {totalValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </strong>
          </div>

          <div className="home-chart">
            <div className="home-chart__header">
              <h2>Resumo por serviço</h2>
              <span>Valores somados</span>
            </div>
            {serviceChart.length === 0 && (
              <div className="home-chart__empty">Sem dados para o gráfico.</div>
            )}
            {serviceChart.map((item) => (
              <div className="home-chart__row" key={item.label}>
                <div className="home-chart__label">{item.label}</div>
                <div className="home-chart__bar">
                  <span
                    style={{
                      width: maxChartValue
                        ? `${(item.value / maxChartValue) * 100}%`
                        : '0%',
                    }}
                  />
                </div>
                <div className="home-chart__value">
                  {item.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
