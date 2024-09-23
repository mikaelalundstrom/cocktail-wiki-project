import { IButton } from "../interfaces";

function Button({ label, onClick, className, disabled }: IButton) {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;
