const BASE_URL = 'https://pokeapi.co/api/v2'

async function request(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo obtener la información de la PokéAPI`)
  }
  return res.json()
}

/**
 * Trae un listado paginado de pokémon (solo nombre y url).
 */
export function getPokemonList(limit = 20, offset = 0) {
  return request(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
}

/**
 * Trae el detalle completo de un pokémon por id o nombre.
 */
export function getPokemonDetail(idOrName) {
  return request(`${BASE_URL}/pokemon/${idOrName}`)
}

/**
 * Trae el listado de tipos disponibles.
 */
export function getTypeList() {
  return request(`${BASE_URL}/type`)
}

/**
 * Trae los pokémon que pertenecen a un tipo dado.
 */
export function getPokemonByType(typeName) {
  return request(`${BASE_URL}/type/${typeName}`)
}

/**
 * Dado un array de {name, url} de pokémon "livianos" (del listado),
 * trae el detalle de cada uno en paralelo para poder mostrar imagen y tipos
 * en las tarjetas del listado.
 */
export async function getPokemonDetailsBatch(pokemonRefs) {
  const details = await Promise.all(
    pokemonRefs.map((p) => getPokemonDetail(p.name))
  )
  return details
}

/**
 * Extrae un id numérico simple a partir de la URL que devuelve la PokéAPI,
 * útil para armar la URL de la imagen o el link de detalle.
 */
export function extractIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean)
  return parts[parts.length - 1]
}
