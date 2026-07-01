import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'pokedex_favorites'

function readFavoritesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/**
 * Hook que expone la lista de favoritos y funciones para alternar/quitar,
 * persistiendo siempre en localStorage.
 * Cada favorito se guarda como { id, name, image, types } para poder
 * pintar la vista de Favoritos sin volver a golpear la API.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(readFavoritesFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites]
  )

  const toggleFavorite = useCallback((pokemon) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === pokemon.id)
      if (exists) {
        return prev.filter((f) => f.id !== pokemon.id)
      }
      return [...prev, pokemon]
    })
  }, [])

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }, [])

  return { favorites, isFavorite, toggleFavorite, removeFavorite }
}
