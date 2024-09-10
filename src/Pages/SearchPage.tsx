import { useEffect, useState } from "react";

import "./SearchPage.css";
import DrinkCard from "../Components/DrinkCard";
import Button from "../Components/Button";

interface IDrink {
  name: string;
  id: number;
  image: string;
}

function SearchPage() {
  const [foundDrinks, setFoundDrinks] = useState<IDrink[]>([]);

  const handleOnSearch = async () => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`
    );
    const data = await response.json();
    console.log(data);
    const drinks = setFoundDrinks(
      data.drinks.map((drink: any) => ({
        name: drink.strDrink,
        id: drink.idDrink,
        image: drink.strDrinkThumb,
      }))
    );
    console.log(drinks);
  };

  useEffect(() => {
    handleOnSearch();
  }, []);

  return (
    <>
      <form>
        <input type="text" placeholder="Search..." />
        <Button className={""} label={"Search"} onClick={handleOnSearch} />
      </form>
      <section className="drink-card-grid"></section>
      {/* <DrinkCard name={name} id={id} image={image} /> */}
    </>
  );
}

export default SearchPage;
