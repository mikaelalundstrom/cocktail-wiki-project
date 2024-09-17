import "./DrinkCard.css";
import { Link } from "react-router-dom";
import "./Header.css";

interface IDrink {
  name: string;
  id: number;
  image: string;
  style?: string;
}

function DrinkCard({ name, id, image, style }: IDrink) {
  return (
    <Link to={`/drink/${id}`} className={style}>
      <article>
        <figure>
          <img src={image} alt="" />
          <figcaption>{name}</figcaption>
        </figure>
      </article>
    </Link>
  );
}

export default DrinkCard;
