import { createContext } from "react";
import { BookI } from "../Types/Types";

interface ContextType {
  books: BookI[];
  setBooks: (books: BookI[]) => void;
}

const initialContext = {
  books: [],
  setBooks: () => {},
};

const GlobalContext = createContext<ContextType>(initialContext);

export default GlobalContext;
