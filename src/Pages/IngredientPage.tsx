import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./IngredientPage.css";
import DrinkCard from "../Components/DrinkCard";

interface IIngredient {
  name: string;
  id: number;
  description?: string;
  type?: string;
  alcohol: string;
  strength?: number;
  image: string;
}

interface IDrink {
  name: string;
  id: number;
  image: string;
  style?: string;
}

function IngredientPage() {
  const { name } = useParams();
  const [activeIngredient, setActiveIngredient] = useState<IIngredient>({
    name: "",
    id: 0,
    description: "",
    type: "",
    alcohol: "",
    strength: 0,
    image: "",
  });
  const [listOfDrinks, setListOfDrinks] = useState<IDrink[]>([]);

  useEffect(() => {
    const getIngredientByName = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
      );
      const data = await response.json();
      console.log("data", data);

      const imgResponse = await fetch(
        `https://www.thecocktaildb.com/images/ingredients/${name}.png`
      );
      console.log(imgResponse.url);

      setActiveIngredient({
        name: data.ingredients[0].strIngredient,
        id: data.ingredients[0].idIngredient,
        description: data.ingredients[0].strDescription,
        type: data.ingredients[0].strType,
        alcohol: data.ingredients[0].strAlcohol,
        strength: data.ingredients[0].strABV,
        image: imgResponse.url,
      });

      console.log(activeIngredient);
    };

    const getDrinksByIngredient = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`
      );
      const data = await response.json();
      console.log("drinks", data);

      if (data.drinks !== null) {
        setListOfDrinks(
          data.drinks.map((drink: any) => ({
            name: drink.strDrink,
            id: drink.idDrink,
            image: drink.strDrinkThumb,
          }))
        );
      } else {
        setListOfDrinks([]);
      }
    };
    getDrinksByIngredient();
    getIngredientByName();
  }, []);

  return (
    <>
      <section className="ingredient-info">
        <section className="image-wrapper">
          <figure className="image">
            <img src={activeIngredient.image} alt={activeIngredient.name} />
          </figure>

          <h1>{activeIngredient.name}</h1>

          <h3>{activeIngredient.type}</h3>
          <p>Alcoholic: {activeIngredient.alcohol}</p>
          {activeIngredient.strength ? <p>Strength: {activeIngredient.strength}%</p> : ""}
        </section>
        {activeIngredient.description ? (
          <section className="description">
            <h2>Description</h2>
            <p>{activeIngredient.description}</p>
          </section>
        ) : null}
        <section className="drink-card-list">
          {listOfDrinks.map((drink) => (
            <DrinkCard
              key={drink.id}
              name={drink.name}
              id={drink.id}
              image={drink.image}
              style="small-list-cards"
            />
          ))}
        </section>
      </section>
    </>
  );
}

export default IngredientPage;
