import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./css/IngredientPage.css";
import DrinkCard from "../Components/DrinkCard";
import ArrowUp from "../assets/arrow-up.svg";
import ChevronDown from "../assets/chevron-down.svg";
import { IIngredient } from "../interfaces";
import { IDrink } from "../interfaces";

function IngredientPage() {
  const { name } = useParams();
  const navigate = useNavigate();

  // States
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
  // Scroll related states/variables
  const [drinkBatch, setDrinkBatch] = useState<number>(1);
  const [showScrollTopBtn, setShowScrollTopBtn] = useState<boolean>(false);
  const drinksPerBatch = 10;
  const lastDrink = drinkBatch * drinksPerBatch;
  const currentDrinks = listOfDrinks.slice(0, lastDrink);
  // States/ref for expandable description
  const [descExpand, setDescExpand] = useState<boolean>(false);
  const [descHeight, setDescHeight] = useState<null | number>(null);
  const descRef = useRef<null | HTMLElement>(null);

  // Keeps track of how much the user has scrolled on the page (for infinite scroll/back to top)
  const handleScroll = () => {
    // updates infinite scroll list of related drinks
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (listOfDrinks.length / drinksPerBatch > drinkBatch) {
        setDrinkBatch((prev) => prev + 1);
      }
    }
    // check how far from top and display/hide scroll to top button
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

  // option to expand/close description when desc text is long
  const toggleDesc = () => {
    setDescExpand((prev) => {
      if (prev) {
        // 480px default max height
        setDescHeight(480);
      } else {
        // full height of description + 64px for some extra padding so button won't cover the text
        setDescHeight(descRef.current!.scrollHeight + 64);
      }
      return !prev;
    });
  };

  // keep track of scroll position
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // clean up
    return () => window.removeEventListener("scroll", handleScroll);
  });

  // fetch ingredient by name
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
        // fetch image by name
        const imgResponse = await fetch(
          `https://www.thecocktaildb.com/images/ingredients/${name}.png`
        );
        //set data for ingredients
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
        navigate("/not-found"); // if there is an error from the API then it redirects to not found
      }
    };

    // fetch list of drinks that includes the ingredient
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
            image: drink.strDrinkThumb + "/preview", // added preview for smaller sized pictures
          }))
        );
      } else {
        setListOfDrinks([]);
      }
    };

    getDrinksByIngredient();
    getIngredientByName();
  }, [name, navigate]);

  // if description is bigger than max height, set it to max height
  useEffect(() => {
    if (descRef.current) {
      if (descRef.current.clientHeight > 480) {
        setDescHeight(480);
      }
    }
  }, [descRef.current]);

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
          <section
            className={descExpand ? "description" : "description closed"}
            ref={descRef}
            style={{ height: `${descHeight}px` }} // set height for transition to work
          >
            <h2>Description</h2>
            <p>{activeIngredient.description}</p>

            <div
              className={
                descRef.current && descRef.current.clientHeight < 480 // don't show if desc height is smaller than 480
                  ? "expand-btn d-none"
                  : !descExpand // check if desc is already open or not
                  ? "expand-btn"
                  : "expand-btn close"
              }
              onClick={toggleDesc}
            >
              <img src={ChevronDown} alt="Expand" />
            </div>
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
        {
          // only show message when there are still drinks to show
          listOfDrinks.length / drinksPerBatch > drinkBatch ? (
            <p>scroll to load more drinks</p>
          ) : null
        }
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
