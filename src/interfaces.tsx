export interface IButton {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export interface ICheckboxContext {
  isNonAlcoholic?: boolean;
  setIsNonAlcoholic?: (value: boolean) => void;
}

export interface IDrink {
  name: string;
  id: number;
  image: string;
  style?: string;
}

export interface IDrinkInfo {
  name: string;
  id: number;
  image: string;
  category: string;
  tags?: string[];
  ingredients: string[];
  measures: string[];
  glass: string;
  instructions: string[];
}

export interface IIngredient {
  name: string;
  id: number;
  description?: string;
  type?: string;
  alcohol: string;
  strength?: number;
  image: string;
}

export interface ISelect {
  label: string;
  options: string[];
  id: string;
}

export interface ISkeleton {
  outer?: string;
  type: string;
}
