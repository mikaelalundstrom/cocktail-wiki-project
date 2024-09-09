import React from "react";
import "./DrinkCard.css";
import { Link } from "react-router-dom";

function DrinkCard() {
  return (
    <article>
      <figure>
        <img src="https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg" alt="" />
        <figcaption>Drink Name</figcaption>
      </figure>
      <Link to="">See more</Link>
    </article>
  );
}

export default DrinkCard;
