import { createContext, useState, ReactNode, useContext } from "react";

interface ICheckboxContext {
  isNonAlcoholic?: boolean;
  setIsNonAlcoholic?: (value: boolean) => void;
}

export const CheckboxContext = createContext<ICheckboxContext>({});

export const CheckboxProvider = ({ children }: { children: ReactNode }) => {
  const [isNonAlcoholic, setIsNonAlcoholic] = useState(false);

  return (
    <CheckboxContext.Provider value={{ isNonAlcoholic, setIsNonAlcoholic }}>
      {children}
    </CheckboxContext.Provider>
  );
};

export const useCheckboxContext = () => useContext(CheckboxContext);