import { useContext } from "react";
import { FavoritesContext } from "../context";
import DrinkCard from "../Components/DrinkCard";

import "./FavoritesPage.css";

function FavoritesPage() {
  const { favoriteDrinks } = useContext(FavoritesContext);
  return (
    <>
      <h1 className="favorites-title">Favorite cocktails</h1>
      <section className="favorites-grid">
        {favoriteDrinks?.map((drink) => (
          <DrinkCard key={drink.id} name={drink.name} id={drink.id} image={drink.image} />
        ))}
      </section>
    </>
  );
}

export default FavoritesPage;
