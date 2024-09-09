interface IButton {
  label: string;
  onClick?: () => void;
  className: string;
}

function Button({ label, onClick, className }: IButton) {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
}

export default Button;
