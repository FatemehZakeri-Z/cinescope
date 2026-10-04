import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar({ appName }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <h1 className="appName">{appName}</h1>

      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Movies
        </NavLink>

        <NavLink
          to="/favorites"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Favorites
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;