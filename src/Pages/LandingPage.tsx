import DrinkCard from "../Components/DrinkCard";
import Button from "../Components/Button.tsx";

export function LandingPage() {
  return (
    <>
      <DrinkCard />
      <Button className={""} label={"Get a new random drink"} />
    </>
  );
}
