import "./css/Select.css";
import { ISelect } from "../interfaces";

function Select({ label, options, id }: ISelect) {
  return (
    <div className="select">
      <select id={id}>
        <option value="">{label}</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
