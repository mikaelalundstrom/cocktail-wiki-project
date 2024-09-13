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
  const [searchMessage, setSearchMessage] = useState<string>("");
  const drinksPerPage = 10;

  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleOnSearch = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (inputRef.current!.value.trim().length > 0) {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputRef.current!.value.trim()}`
        );
        const data = await response.json();
        console.log(data);
        messageForDrinksFound(data.drinks);

        if (data.drinks !== null) {
          setFoundDrinks(
            data.drinks.map((drink: any) => ({
              name: drink.strDrink,
              id: drink.idDrink,
              image: drink.strDrinkThumb,
            }))
          );
        } else {
          setFoundDrinks([]);
        }
      } else {
        setFoundDrinks([]);
        setSearchMessage("Search not valid");
      }
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  const messageForDrinksFound = (drinks: [] | null) => {
    if (drinks === null) {
      setSearchMessage("No drinks found");
    } else {
      if (drinks!.length === 0) {
        setSearchMessage("No drinks found");
      } else if (drinks!.length === 1) {
        setSearchMessage(`${drinks!.length} drink found`);
      } else {
        setSearchMessage(`${drinks!.length} drinks found`);
      }
    }
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
      <form className="search-form" onSubmit={handleOnSearch}>
        <input type="text" placeholder="Search..." ref={inputRef} required />
        <Button className={"search-button"} label={"Search"} />
      </form>
      <p className="search-message">{searchMessage}</p>
      {foundDrinks.length < 11 ? (
        ""
      ) : (
        <section className="searchPage-button-section">
          <Button onClick={prevPage} label={"Back"} disabled={currentPage === 1 ? true : false} />
          <Button
            onClick={nextPage}
            label={"Next"}
            disabled={currentPage === Math.ceil(foundDrinks.length / drinksPerPage) ? true : false}
          />
        </section>
      )}
      <section className="drink-card-grid">
        {currentDrinks.map((drink) => (
          <DrinkCard key={drink.id} name={drink.name} id={drink.id} image={drink.image} />
        ))}
      </section>
      {foundDrinks.length < 11 ? (
        ""
      ) : (
        <section className="searchPage-button-section bottom">
          <Button onClick={prevPage} label={"Back"} disabled={currentPage === 1 ? true : false} />
          <Button
            onClick={nextPage}
            label={"Next"}
            disabled={currentPage === Math.ceil(foundDrinks.length / drinksPerPage) ? true : false}
          />
        </section>
      )}
    </>
  );
}

export default SearchPage;
