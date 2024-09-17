import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import { FavoritesContext } from "./context";
import { useState } from "react";

interface IDrink {
  name: string;
  id: number;
  image: string;
}

function App() {
  const [favoriteDrinks, setFavoriteDrinks] = useState<IDrink[]>([]);

  return (
    <>
      <Header />
      <FavoritesContext.Provider value={{ favoriteDrinks, setFavoriteDrinks }}>
        <Outlet />
      </FavoritesContext.Provider>
    </>
  );
}

export default App;
