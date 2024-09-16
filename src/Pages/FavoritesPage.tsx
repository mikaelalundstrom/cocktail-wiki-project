import { useContext } from "react";
import { FavoritesContext } from "../context";
import DrinkCard from "../Components/DrinkCard";

function FavoritesPage() {
  const { favoriteDrinks } = useContext(FavoritesContext);
  return (
    <div>
      <h1>Favorite cocktails</h1>
      <section className="favorites-grid">
        {favoriteDrinks?.map((drink) => (
          <DrinkCard key={drink.id} name={drink.name} id={drink.id} image={drink.image} />
        ))}
      </section>
    </div>
  );
}

export default FavoritesPage;
