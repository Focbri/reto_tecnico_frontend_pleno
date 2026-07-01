export default function Loader({ label = 'Cargando pokémon...' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__ball">
        <div className="loader__ball-top" />
        <div className="loader__ball-line" />
        <div className="loader__ball-center" />
      </div>
      <p className="loader__label">{label}</p>
    </div>
  )
}
