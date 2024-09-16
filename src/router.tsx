import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import LandingPage from "./Pages/LandingPage";
import SearchPage from "./Pages/SearchPage";
import CocktailInfoPage from "./Pages/CocktailInfoPage";
import FavoritesPage from "./Pages/FavoritesPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/drink/:id" element={<CocktailInfoPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Route>
  )
);
