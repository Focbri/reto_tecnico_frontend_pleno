import { Link } from 'react-router-dom'
import { getTypeColor } from '../utils/typeColors'

export default function PokemonCard({ pokemon, isFavorite, onToggleFavorite }) {
  const { id, name, image, types } = pokemon

  return (
    <div className="poke-card">
      <button
        className={`poke-card__fav ${isFavorite ? 'is-active' : ''}`}
        onClick={() => onToggleFavorite(pokemon)}
        aria-label={isFavorite ? `Quitar ${name} de favoritos` : `Agregar ${name} a favoritos`}
        aria-pressed={isFavorite}
      >
        ★
      </button>

      <Link to={`/pokemon/${id}`} className="poke-card__link">
        <div className="poke-card__id">#{String(id).padStart(3, '0')}</div>
        <img className="poke-card__img" src={image} alt={name} loading="lazy" />
        <h3 className="poke-card__name">{name}</h3>
        <div className="poke-card__types">
          {types.map((t) => (
            <span
              key={t}
              className="type-badge"
              style={{ backgroundColor: getTypeColor(t) }}
            >
              {t}
            </span>
          ))}
        </div>
      </Link>
    </div>
  )
}
