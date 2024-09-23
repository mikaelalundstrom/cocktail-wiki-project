import DrinkCard from "../Components/DrinkCard";
import Button from "../Components/Button";
import { useEffect, useState } from "react";
import { useCheckboxContext } from "../CheckBoxContext";
import "./LandingPage.css";
import SkeletonCard from "../Skeletons/SkeletonCard.tsx";

interface IDrink {
  name: string;
  id: number;
  image: string;
}

function LandingPage() {
  const [activeDrink, setActiveDrink] = useState<IDrink>();

  const { isNonAlcoholic, setIsNonAlcoholic } = useCheckboxContext();

  const handleOnGetRandomDrink = async () => {
    let url: string;

    if (isNonAlcoholic) {
      url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
      const response = await fetch(url);
      const data = await response.json();

      const randomIndex = Math.floor(Math.random() * data.drinks.length);
      const randomDrink = data.drinks[randomIndex];

      setActiveDrink({
        name: randomDrink.strDrink,
        id: randomDrink.idDrink,
        image: randomDrink.strDrinkThumb,
      });
    } else {
      url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
      const response = await fetch(url);
      const data = await response.json();
      setActiveDrink({
        name: data.drinks[0].strDrink,
        id: data.drinks[0].idDrink,
        image: data.drinks[0].strDrinkThumb,
      });
    }
  };

  useEffect(() => {
    handleOnGetRandomDrink();
  }, [isNonAlcoholic]); 

  const handleCheckboxChange = () => {
    setIsNonAlcoholic(!isNonAlcoholic);
  };

  return (
    <section className="landing-page">
      {activeDrink ? (
        <DrinkCard
          name={activeDrink.name}
          id={activeDrink.id}
          image={activeDrink.image}
          style="drink-card"
        />
      ) : (
        <SkeletonCard />
      )}

      <Button
        label={"Get a new random drink"}
        onClick={handleOnGetRandomDrink}
        className="button"
      />

      <div className="filter">
        <label>
          <input
            type="checkbox"
            checked={isNonAlcoholic}
            onChange={handleCheckboxChange}
          />
          Show non-alcoholic drinks
        </label>
      </div>
    </section>
  );
}

export default LandingPage;