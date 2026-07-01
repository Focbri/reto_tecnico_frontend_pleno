import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { getPokemonDetail } from '../api/pokeApi.js'
import { getTypeColor } from '../utils/typeColors'

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  speed: 'Velocidad',
}

export default function PokemonDetail({ isFavorite, toggleFavorite }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = () => {
    setLoading(true)
    setError(null)
    getPokemonDetail(id)
      .then(setPokemon)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (loading) return <Loader label="Cargando detalle..." />
  if (error) return <ErrorMessage message={error} onRetry={load} />
  if (!pokemon) return null

  const image =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default
  const types = pokemon.types.map((t) => t.type.name)
  const mainColor = getTypeColor(types[0])

  const cardData = { id: pokemon.id, name: pokemon.name, image, types }
  const relevantStats = pokemon.stats.filter((s) => STAT_LABELS[s.stat.name])

  return (
    <section className="page">
      <button className="btn btn--secondary back-btn" onClick={() => navigate(-1)}>
        ← Volver al listado
      </button>

      <div className="detail-card" style={{ '--accent': mainColor }}>
        <div className="detail-card__screws">
          <span /> <span />
        </div>

        <div className="detail-card__header">
          <span className="detail-card__id">#{String(pokemon.id).padStart(3, '0')}</span>
          <button
            className={`poke-card__fav ${isFavorite(pokemon.id) ? 'is-active' : ''}`}
            onClick={() => toggleFavorite(cardData)}
            aria-pressed={isFavorite(pokemon.id)}
          >
            ★
          </button>
        </div>

        <img className="detail-card__img" src={image} alt={pokemon.name} />
        <h2 className="detail-card__name">{pokemon.name}</h2>

        <div className="poke-card__types detail-card__types">
          {types.map((t) => (
            <span key={t} className="type-badge" style={{ backgroundColor: getTypeColor(t) }}>
              {t}
            </span>
          ))}
        </div>

        <div className="detail-card__stats">
          {relevantStats.map((s) => (
            <div key={s.stat.name} className="stat-row">
              <span className="stat-row__label">{STAT_LABELS[s.stat.name]}</span>
              <div className="stat-row__bar">
                <div
                  className="stat-row__fill"
                  style={{ width: `${Math.min(100, s.base_stat)}%` }}
                />
              </div>
              <span className="stat-row__value">{s.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
