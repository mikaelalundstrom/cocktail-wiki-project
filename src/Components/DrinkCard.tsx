import React from "react";
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
    <article className="drink-card">
      <figure>
        <img src={image} alt="" />
        <figcaption>{name}</figcaption>
      </figure>
      <Link to={`/drink/${id}`}>See more</Link>
    </article>
  );
}

export default DrinkCard;
