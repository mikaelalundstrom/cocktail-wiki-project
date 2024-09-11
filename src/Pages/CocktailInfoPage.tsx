import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IDrinkInfo {
  name: string;
  id: number;
  image: string;
  category: string;
  tags?: string[];
  ingredients: string[];
  measures: string[];
  glass: string;
  instructions: string;
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
    instructions: "",
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
        instructions: data.drinks[0].strInstructions,
      });
    };
    getDrinkById();
  }, []);

  return (
    <section className="drink-info">
      <section>
        <figure>
          <img src={activeDrink.image} alt={activeDrink.name} />
        </figure>
        <h1>{activeDrink.name}</h1>
        <h3>{activeDrink.category}</h3>
      </section>
      <section>
        <h2>Ingredients</h2>
        <div>
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
      <section>
        <h2>Instructions</h2>
        <p>{activeDrink.instructions}</p>
        <p>Best served in a {activeDrink.glass}</p>
        {activeDrink.tags ? <p>{activeDrink.tags[0]}</p> : ""}
      </section>
    </section>
  );
}

export default CocktailInfoPage;
