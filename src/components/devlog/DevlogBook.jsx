import ornementCoin from '../../assets/ornements/ornement_coin.png'
import ornementVignette from '../../assets/ornements/ornement_vignette.png'
import devlogData from '../../data/devlog.json'

const CORNERS = [
  { key: 'tl', style: { top: 0, left: 0 }, rotation: '0deg' },
  { key: 'tr', style: { top: 0, right: 0 }, rotation: '90deg' },
  { key: 'br', style: { bottom: 0, right: 0 }, rotation: '180deg' },
  { key: 'bl', style: { bottom: 0, left: 0 }, rotation: '270deg' },
]

export default function DevlogBook() {
  return (
    <div style={{
      display: 'flex',
      width: '780px',
      height: '520px',
      background: 'var(--color-ink)',
      border: '1px solid var(--color-ash)',
      position: 'relative',
      boxShadow: '0 0 40px rgba(0,0,0,0.8)',
    }}>
      {CORNERS.map(({ key, style, rotation }) => (
        <img
          key={key}
          src={ornementCoin}
          alt=""
          style={{
            position: 'absolute',
            width: '48px',
            transform: `rotate(${rotation})`,
            mixBlendMode: 'multiply',
            ...style,
          }}
        />
      ))}

      {/* Page gauche — liste des entrées */}
      <div style={{
        flex: 1,
        padding: '3rem 2rem 3rem 3rem',
        borderRight: '1px solid var(--color-ash)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        overflow: 'hidden',
      }}>
        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '1.1rem',
          letterSpacing: '0.15em',
          color: 'var(--color-parchment)',
          borderBottom: '1px solid var(--color-ash)',
          paddingBottom: '0.75rem',
        }}>
          Journal de Développement
        </h2>
        {devlogData.map((entry) => (
          <div key={entry.id} style={{ fontSize: '0.8rem', fontFamily: 'Cinzel, serif', color: 'var(--color-fog)' }}>
            <span style={{ color: 'var(--color-parchment)' }}>{entry.date}</span>
            <br />
            {entry.title}
          </div>
        ))}
      </div>

      {/* Reliure centrale */}
      <div style={{ width: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={ornementVignette} alt="" style={{ width: '100%', mixBlendMode: 'multiply' }} />
      </div>

      {/* Page droite — contenu de la première entrée */}
      <div style={{
        flex: 1.2,
        padding: '3rem 3rem 3rem 2rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {devlogData.slice(0, 1).map((entry) => (
          <div key={entry.id}>
            <h3 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '1rem',
              color: 'var(--color-parchment)',
              marginBottom: '0.75rem',
            }}>
              {entry.title}
            </h3>
            <p style={{
              fontFamily: 'IM Fell English, serif',
              fontSize: '0.9rem',
              lineHeight: '1.8',
              color: 'var(--color-white-ink)',
            }}>
              {entry.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
