import { createContext } from "react";
import { IDrink } from "../interfaces";

export const SearchContext = createContext<{
  foundDrinks?: IDrink[];
  setFoundDrinks?: (foundDrinks: IDrink[]) => void;
  searchMessage?: string;
  setSearchMessage?: (searchMessage: string) => void;
}>({});
