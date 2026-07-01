import { useState, useEffect, useCallback } from 'react'
import PokemonCard from '../components/PokemonCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Pagination from '../components/Pagination.jsx'
import TypeFilter from '../components/TypeFilter.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import {
  getPokemonList,
  getPokemonDetailsBatch,
  getTypeList,
  getPokemonByType,
  extractIdFromUrl,
} from '../api/pokeApi.js'

const PAGE_SIZE = 20

function mapDetailToCard(detail) {
  return {
    id: detail.id,
    name: detail.name,
    image:
      detail.sprites?.other?.['official-artwork']?.front_default ||
      detail.sprites?.front_default,
    types: detail.types.map((t) => t.type.name),
  }
}

export default function PokemonList({ favorites, isFavorite, toggleFavorite }) {
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [offset, setOffset] = useState(0)
  const [hasNext, setHasNext] = useState(true)
  const [search, setSearch] = useState('')

  const [types, setTypes] = useState([])
  const [selectedType, setSelectedType] = useState('')

  // Carga el listado de tipos una sola vez (para el filtro bonus)
  useEffect(() => {
    getTypeList()
      .then((data) => setTypes(data.results))
      .catch(() => {
        // el filtro por tipo es un bonus: si falla, simplemente no se muestra
      })
  }, [])

  const loadPage = useCallback(async (currentOffset) => {
    setLoading(true)
    setError(null)
    try {
      const listData = await getPokemonList(PAGE_SIZE, currentOffset)
      const details = await getPokemonDetailsBatch(listData.results)
      setPokemonList(details.map(mapDetailToCard))
      setHasNext(Boolean(listData.next))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadByType = useCallback(async (typeName) => {
    setLoading(true)
    setError(null)
    try {
      const typeData = await getPokemonByType(typeName)
      // Limitamos para no golpear la API con cientos de detalles a la vez
      const refs = typeData.pokemon.slice(0, PAGE_SIZE).map((p) => p.pokemon)
      const details = await getPokemonDetailsBatch(refs)
      setPokemonList(details.map(mapDetailToCard))
      setHasNext(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (selectedType) {
      loadByType(selectedType)
    } else {
      loadPage(offset)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, selectedType])

  const handleTypeSelect = (typeName) => {
    setSelectedType(typeName)
    setOffset(0)
    setSearch('')
  }

  const filteredList = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="page">
      <div className="page__toolbar">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {types.length > 0 && (
        <TypeFilter types={types} selectedType={selectedType} onSelect={handleTypeSelect} />
      )}

      {loading && <Loader />}

      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={() => (selectedType ? loadByType(selectedType) : loadPage(offset))}
        />
      )}

      {!loading && !error && (
        <>
          {filteredList.length === 0 ? (
            <p className="empty-state">No se encontraron pokémon con ese nombre.</p>
          ) : (
            <div className="poke-grid">
              {filteredList.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isFavorite={isFavorite(pokemon.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}

          {!selectedType && (
            <Pagination
              page={offset / PAGE_SIZE + 1}
              hasPrev={offset > 0}
              hasNext={hasNext}
              onPrev={() => setOffset((o) => Math.max(0, o - PAGE_SIZE))}
              onNext={() => setOffset((o) => o + PAGE_SIZE)}
            />
          )}
        </>
      )}
    </section>
  )
}
