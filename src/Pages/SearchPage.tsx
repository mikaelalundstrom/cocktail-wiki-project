import { FormEvent, useRef, useState } from "react";

import "./SearchPage.css";
import DrinkCard from "../Components/DrinkCard";
import Button from "../Components/Button";

interface IDrink {
  name: string;
  id: number;
  image: string;
}

function SearchPage() {
  const [inputValue, setinputValue] = useState<string>("");
  const [foundDrinks, setFoundDrinks] = useState<IDrink[]>([]);

  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleOnSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputRef.current!.value}`
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

  return (
    <>
      <form onSubmit={handleOnSearch}>
        <input type="text" placeholder="Search..." ref={inputRef} />
        <Button className={""} label={"Search"} />
      </form>
      <section className="drink-card-grid">
        {foundDrinks.map((drink) => (
          <DrinkCard key={drink.id} name={drink.name} id={drink.id} image={drink.image} />
        ))}
      </section>
      {/*  */}
    </>
  );
}

export default SearchPage;
