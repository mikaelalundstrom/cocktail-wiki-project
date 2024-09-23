import { createContext } from "react";
import { IDrink } from "../interfaces";

// context used to keep track of if drink is favorited or not
export const FavoritesContext = createContext<{
  favoriteDrinks?: IDrink[];
  setFavoriteDrinks?: (favoriteDrinks: IDrink[]) => void;
}>({});
