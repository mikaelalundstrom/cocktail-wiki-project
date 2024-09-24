import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import { FavoritesContext } from "./Context/FavoritesContext";
import { useState } from "react";
import { CheckboxProvider } from "./Context/CheckBoxContext"; // Import the provider
import { IDrink } from "./interfaces";
import { SearchContext } from "./Context/SearchContext";

function App() {
  // favorite, search and search message context
  const [favoriteDrinks, setFavoriteDrinks] = useState<IDrink[]>([]);
  const [foundDrinks, setFoundDrinks] = useState<IDrink[]>([]);
  const [searchMessage, setSearchMessage] = useState<string>("");

  return (
    <>
      <Header />
      {/* favorites provider */}
      <FavoritesContext.Provider value={{ favoriteDrinks, setFavoriteDrinks }}>
        {/* non-alcholic checkbox provider */}
        <CheckboxProvider>
          <SearchContext.Provider
            value={{ foundDrinks, setFoundDrinks, searchMessage, setSearchMessage }}
          >
            <Outlet />
          </SearchContext.Provider>
        </CheckboxProvider>
      </FavoritesContext.Provider>
    </>
  );
}

export default App;
