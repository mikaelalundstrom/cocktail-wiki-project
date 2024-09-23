import { useContext } from "react";
import { FavoritesContext } from "../Context/FavoritesContext";
import DrinkCard from "../Components/DrinkCard";

import "./css/FavoritesPage.css";

function FavoritesPage() {
  // use context to display favorites
  const { favoriteDrinks } = useContext(FavoritesContext);
  return (
    <>
      <h1 className="favorites-title">Favorite cocktails</h1>
      {favoriteDrinks!.length === 0 || !favoriteDrinks ? (
        <h2 className="no-favorite-text">No favorites added</h2>
      ) : null}

      <section className="favorites-grid">
        {favoriteDrinks?.map((drink) => (
          <DrinkCard
            key={drink.id}
            name={drink.name}
            id={drink.id}
            image={drink.image}
            style="drink-card"
          />
        ))}
      </section>
    </>
  );
}

export default FavoritesPage;
