import { Link } from "react-router-dom";

import "./Header.css";

function Header() {
  return (
    <header>
      <Link to="/">
        <h1>Cocktail-Wiki</h1>
      </Link>
      <div>
        <Link to="/search">Search</Link>
        <Link to="/info">Cocktail Info</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/ingredients">Ingredients</Link>
      </div>
    </header>
  );
}
export default Header;
