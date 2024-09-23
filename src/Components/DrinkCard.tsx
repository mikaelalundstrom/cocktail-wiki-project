import "./css/DrinkCard.css";
import { Link } from "react-router-dom";
import "./css/Header.css";
import { IDrink } from "../interfaces";

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
