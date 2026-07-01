export default function Pagination({ onPrev, onNext, hasPrev, hasNext, page }) {
  return (
    <div className="pagination">
      <button className="btn btn--secondary" onClick={onPrev} disabled={!hasPrev}>
        ← Anterior
      </button>
      <span className="pagination__page">Página {page}</span>
      <button className="btn btn--secondary" onClick={onNext} disabled={!hasNext}>
        Siguiente →
      </button>
    </div>
  )
}
