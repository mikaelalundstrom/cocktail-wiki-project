import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import LandingPage from "./Pages/LandingPage";
import SearchPage from "./Pages/SearchPage";
import CocktailInfoPage from "./Pages/CocktailInfoPage";
import FavoritesPage from "./Pages/FavoritesPage";
import IngredientPage from "./Pages/IngredientPage";
import NotFound from "./Pages/NotFoundPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<NotFound />}>
      <Route index element={<LandingPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/drink/:id" element={<CocktailInfoPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/ingredient/:name" element={<IngredientPage />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
