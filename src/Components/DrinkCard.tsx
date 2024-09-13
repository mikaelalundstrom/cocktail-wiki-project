import "./DrinkCard.css";
import { Link } from "react-router-dom";
import "./Header.css";

interface IDrink {
  name: string;
  id: number;
  image: string;
}

function DrinkCard({ name, id, image }: IDrink) {
  return (
    <Link to={`/drink/${id}`} className="drink-link">
      <article className="drink-card">
        <figure>
          <img src={image} alt="" />
          <figcaption>{name}</figcaption>
        </figure>
      </article>
    </Link>
  );
}

export default DrinkCard;
