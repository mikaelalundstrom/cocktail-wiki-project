import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import { FavoritesContext } from "./Context/FavoritesContext";
import { useState } from "react";
import { CheckboxProvider } from "./Context/CheckBoxContext"; // Import the provider
import { IDrink } from "./interfaces";

function App() {
  // favorite context
  const [favoriteDrinks, setFavoriteDrinks] = useState<IDrink[]>([]);

  return (
    <>
      <Header />
      {/* favorites provider */}
      <FavoritesContext.Provider value={{ favoriteDrinks, setFavoriteDrinks }}>
        {/* non-alcholic checkbox provider */}
        <CheckboxProvider>
          <Outlet />
        </CheckboxProvider>
      </FavoritesContext.Provider>
    </>
  );
}

export default App;
