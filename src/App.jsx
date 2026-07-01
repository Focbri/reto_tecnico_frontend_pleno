import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import PokemonList from './pages/PokemonList.jsx'
import PokemonDetail from './pages/PokemonDetail.jsx'
import Favorites from './pages/Favorites.jsx'
import { useFavorites } from './hooks/useFavorites.js'

export default function App() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites()

  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Routes>
          <Route
            path="/"
            element={
              <PokemonList
                favorites={favorites}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/pokemon/:id"
            element={
              <PokemonDetail isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
            }
          />
          <Route
            path="/favoritos"
            element={
              <Favorites
                favorites={favorites}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}
