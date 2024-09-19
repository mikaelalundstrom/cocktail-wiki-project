import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 
import "./IngredientPage.css";
import DrinkCard from "../Components/DrinkCard";
import ArrowUp from "../assets/arrow-up.svg";

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
  const navigate = useNavigate(); // 
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
  const [drinkBatch, setDrinkBatch] = useState<number>(1);
  const [showScrollTopBtn, setShowScrollTopBtn] = useState<boolean>(false);
  const drinksPerBatch = 10;

  const lastDrink = drinkBatch * drinksPerBatch;
  const currentDrinks = listOfDrinks.slice(0, lastDrink);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (listOfDrinks.length / drinksPerBatch > drinkBatch) {
        setDrinkBatch((prev) => prev + 1);
      }
    }

    if (document.documentElement.scrollTop > 20) {
      setShowScrollTopBtn(true);
    } else {
      setShowScrollTopBtn(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    const getIngredientByName = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
        );
        const data = await response.json();
        
        // check if it finds the ingredient
        if (!data.ingredients || data.ingredients.length === 0) {
          navigate("/not-found"); // if not to not found page
          return;
        }

        const imgResponse = await fetch(
          `https://www.thecocktaildb.com/images/ingredients/${name}.png`
        );

        setActiveIngredient({
          name: data.ingredients[0].strIngredient,
          id: data.ingredients[0].idIngredient,
          description: data.ingredients[0].strDescription,
          type: data.ingredients[0].strType,
          alcohol: data.ingredients[0].strAlcohol,
          strength: data.ingredients[0].strABV,
          image: imgResponse.url,
        });
      } catch (error) {
        console.error("Error fetching ingredient data:", error);
        navigate("/not-found"); // if there is an error fro mthe api then it redirects to not found
      }
    };

    const getDrinksByIngredient = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`
      );
      const data = await response.json();

      if (data.drinks !== null) {
        setListOfDrinks(
          data.drinks.map((drink: any) => ({
            name: drink.strDrink,
            id: drink.idDrink,
            image: drink.strDrinkThumb + "/preview",
          }))
        );
      } else {
        setListOfDrinks([]);
      }
    };

    getDrinksByIngredient();
    getIngredientByName();
  }, [name, navigate]); // 

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
          {activeIngredient.strength ? (
            <p>Strength: {activeIngredient.strength}%</p>
          ) : (
            ""
          )}
        </section>
        {activeIngredient.description ? (
          <section className="description">
            <h2>Description</h2>
            <p>{activeIngredient.description}</p>
          </section>
        ) : null}

        {currentDrinks.length !== 0 ? (
          <h2 className="list-title">{activeIngredient.name} is used to make:</h2>
        ) : null}

        <section className="drink-card-list">
          {currentDrinks.map((drink) => (
            <DrinkCard
              key={drink.id}
              name={drink.name}
              id={drink.id}
              image={drink.image}
              style="small-list-cards"
            />
          ))}
        </section>
        {listOfDrinks.length / drinksPerBatch > drinkBatch ? (
          <p>scroll to load more drinks</p>
        ) : null}
        {showScrollTopBtn ? (
          <button className="scroll-to-top" onClick={scrollToTop}>
            <img src={ArrowUp} alt="To top" />
          </button>
        ) : null}
      </section>
    </>
  );
}

export default IngredientPage;