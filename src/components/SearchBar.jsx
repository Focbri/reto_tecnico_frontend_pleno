export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">⌕</span>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Buscar pokémon por nombre..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar pokémon por nombre"
      />
    </div>
  )
}
