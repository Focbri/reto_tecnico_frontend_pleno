import { getTypeColor } from '../utils/typeColors'

export default function TypeFilter({ types, selectedType, onSelect }) {
  return (
    <div className="type-filter">
      <button
        className={`type-chip ${selectedType === '' ? 'is-active' : ''}`}
        onClick={() => onSelect('')}
      >
        Todos
      </button>
      {types.map((t) => (
        <button
          key={t.name}
          className={`type-chip ${selectedType === t.name ? 'is-active' : ''}`}
          style={{
            borderColor: getTypeColor(t.name),
            backgroundColor: selectedType === t.name ? getTypeColor(t.name) : 'transparent',
          }}
          onClick={() => onSelect(t.name)}
        >
          {t.name}
        </button>
      ))}
    </div>
  )
}
