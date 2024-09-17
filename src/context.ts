import { createContext } from "react";

interface IDrink {
  name: string;
  id: number;
  image: string;
}

export const FavoritesContext = createContext<{
  favoriteDrinks?: IDrink[];
  setFavoriteDrinks?: (favoriteDrinks: IDrink[]) => void;
}>({});
