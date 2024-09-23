import { createContext, useState, ReactNode, useContext } from "react";
import { ICheckboxContext } from "../interfaces";

// context to keep track of if user wants to see only non-alcoholic drinks on landing page

export const CheckboxContext = createContext<ICheckboxContext>({});

// context provider: what is passed with the context
export const CheckboxProvider = ({ children }: { children: ReactNode }) => {
  const [isNonAlcoholic, setIsNonAlcoholic] = useState(false);

  return (
    <CheckboxContext.Provider value={{ isNonAlcoholic, setIsNonAlcoholic }}>
      {children}
    </CheckboxContext.Provider>
  );
};

export const useCheckboxContext = () => useContext(CheckboxContext);
