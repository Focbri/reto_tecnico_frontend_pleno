import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__lens" />
          Pokédex
        </NavLink>
        <nav className="navbar__links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
          >
            Explorar
          </NavLink>
          <NavLink
            to="/favoritos"
            className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
          >
            Favoritos
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
