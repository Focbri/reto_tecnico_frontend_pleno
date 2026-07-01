import PokemonCard from '../components/PokemonCard.jsx'

export default function Favorites({ favorites, isFavorite, toggleFavorite }) {
  return (
    <section className="page">
      <h2 className="page__title">Tus favoritos</h2>

      {favorites.length === 0 ? (
        <p className="empty-state">
          Todavía no marcaste ningún pokémon como favorito. Andá al listado y tocá la
          estrella ★ en la tarjeta que te guste.
        </p>
      ) : (
        <div className="poke-grid">
          {favorites.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={isFavorite(pokemon.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}
