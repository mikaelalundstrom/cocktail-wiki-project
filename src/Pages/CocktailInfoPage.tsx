import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heart from "../assets/heart.svg";

import "./CocktailInfoPage.css";

interface IDrinkInfo {
  name: string;
  id: number;
  image: string;
  category: string;
  tags?: string[];
  ingredients: string[];
  measures: string[];
  glass: string;
  instructions: string[];
}

function CocktailInfoPage() {
  let { id } = useParams();
  const [activeDrink, setActiveDrink] = useState<IDrinkInfo>({
    name: "",
    id: 0,
    image: "",
    category: "",
    tags: [],
    ingredients: [],
    measures: [],
    glass: "",
    instructions: [],
  });

  useEffect(() => {
    const getDrinkById = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      console.log(data);

      let tags;
      if (data.drinks[0].strTags) {
        tags = data.drinks[0].strTags.split(",");
      }
      const instructions = data.drinks[0].strInstructions.split(". ");
      let measuresArr: string[] = [];
      let ingredientsArr: string[] = [];

      for (let i = 1; data.drinks[0]["strMeasure" + i]; i++) {
        const measureItem: string = data.drinks[0]["strMeasure" + i];
        measuresArr.push(measureItem);
      }
      for (let i = 1; data.drinks[0]["strIngredient" + i]; i++) {
        const ingredientItem: string = data.drinks[0]["strIngredient" + i];
        ingredientsArr.push(ingredientItem);
      }

      setActiveDrink({
        name: data.drinks[0].strDrink,
        id: data.drinks[0].idDrink,
        image: data.drinks[0].strDrinkThumb,
        category: data.drinks[0].strCategory,
        tags: tags,
        ingredients: ingredientsArr,
        measures: measuresArr,
        glass: data.drinks[0].strGlass,
        instructions: instructions,
      });
    };
    getDrinkById();
  }, []);

  return (
    <section className="drink-info">
      <section className="image-wrapper">
        <figure className="image">
          <img src={activeDrink.image} alt={activeDrink.name} />
        </figure>
        <div className="header-icon-container">
          <h1>{activeDrink.name}</h1>
          <figure className="icon">
            <img src={Heart} alt="" />
          </figure>
        </div>
        <h3>{activeDrink.category}</h3>
      </section>
      <section className="ingredients">
        <h2>Ingredients</h2>
        <div className="ingredients-content">
          <div>
            {activeDrink.measures.map((measure: string) => (
              <p>{measure}</p>
            ))}
          </div>
          <div>
            {activeDrink.ingredients.map((ingredient: string) => (
              <p>{ingredient}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="instructions">
        <h2>Instructions</h2>
        <div className="instructions-text">
          {activeDrink.instructions.map((instruction: string) => (
            <p>{instruction}</p>
          ))}
        </div>
        <p className="glass-info">Best served in a {activeDrink.glass}</p>
        <div className="tags">
          {activeDrink.tags ? activeDrink.tags.map((tag: string) => <p>{tag}</p>) : ""}
        </div>
      </section>
    </section>
  );
}

export default CocktailInfoPage;
