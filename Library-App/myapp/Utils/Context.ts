import { createContext } from "react";
import { AuthorI, BookI } from "../Types/Types";

interface ContextType {
  books: BookI[];
  setBooks: (books: BookI[]) => void;
  authors: AuthorI[];
  setAuthors: (authors: AuthorI[]) => void;
}

const initialContext = {
  books: [],
  setBooks: () => {},
  authors: [],
  setAuthors: () => {},
};

const GlobalContext = createContext<ContextType>(initialContext);

export default GlobalContext;
