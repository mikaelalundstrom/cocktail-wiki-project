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
  const [foundDrinks, setFoundDrinks] = useState<IDrink[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const drinksPerPage = 10;

  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleOnSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${
        inputRef.current!.value
      }`
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
    setCurrentPage(1);
    console.log(drinks);
  };

  const lastDrink = currentPage * drinksPerPage;
  const firstDrink = lastDrink - drinksPerPage;
  const currentDrinks = foundDrinks.slice(firstDrink, lastDrink);

  const nextPage = () => {
    if (Math.ceil(foundDrinks.length / drinksPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <form onSubmit={handleOnSearch}>
        <input type="text" placeholder="Search..." ref={inputRef} />
        <Button className={""} label={"Search"} />
      </form>

      {foundDrinks.length < 4 ? (
        ""
      ) : (
        <section className="searchPage-button-section top">
          <Button
            onClick={prevPage}
            label={"Back"}
            disabled={currentPage === 1 ? true : false}
          />
          <Button
            onClick={nextPage}
            label={"Next"}
            disabled={
              currentPage === Math.ceil(foundDrinks.length / drinksPerPage)
                ? true
                : false
            }
          />
        </section>
      )}
      <section className="drink-card-grid">
        {currentDrinks.map((drink) => (
          <DrinkCard
            key={drink.id}
            name={drink.name}
            id={drink.id}
            image={drink.image}
          />
        ))}
      </section>
      <section className="searchPage-button-section bottom">
        <Button
          onClick={prevPage}
          label={"Back"}
          disabled={currentPage === 1 ? true : false}
        />
        <Button
          onClick={nextPage}
          label={"Next"}
          disabled={
            currentPage === Math.ceil(foundDrinks.length / drinksPerPage)
              ? true
              : false
          }
        />
      </section>
    </>
  );
}

export default SearchPage;
