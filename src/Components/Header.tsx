import { Link } from "react-router-dom";

import "./css/Header.css";

function Header() {
  return (
    <header>
      <Link to="/">
        <h1>Cocktail-Wiki</h1>
      </Link>
      <div>
        <Link to="/search">Search</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </header>
  );
}
export default Header;
