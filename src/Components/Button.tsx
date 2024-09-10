interface IButton {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

function Button({ label, onClick, className, disabled }: IButton) {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;
