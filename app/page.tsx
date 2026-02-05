export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#eee',
        margin: 0,
        padding: 20,
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
        Hello World
      </h1>
      <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
        Next.js no EasyPanel / Hostinger
      </p>
    </main>
  )
}
