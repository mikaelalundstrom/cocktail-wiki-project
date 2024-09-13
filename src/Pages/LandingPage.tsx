import DrinkCard from "../Components/DrinkCard";
import Button from "../Components/Button.tsx";
import { useEffect, useState } from "react";
import "./LandingPage.css";

interface IDrink {
  name: string;
  id: number;
  image: string;
}

function LandingPage() {
  const [activeDrink, setActiveDrink] = useState<IDrink>({
    name: "",
    id: 0,
    image: "",
  });

  const handleOnGetRandomDrink = async () => {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const data = await response.json();
    console.log(data);
    setActiveDrink({
      name: data.drinks[0].strDrink,
      id: data.drinks[0].idDrink,
      image: data.drinks[0].strDrinkThumb,
    });
  };

  useEffect(() => {
    handleOnGetRandomDrink();
  }, []);

  return (
    <section className="landing-page">
      <DrinkCard name={activeDrink!.name} id={activeDrink!.id} image={activeDrink!.image} />
      <Button
        label={"Get a new random drink"}
        onClick={handleOnGetRandomDrink}
        className="button"
      />
    </section>
  );
}

export default LandingPage;
