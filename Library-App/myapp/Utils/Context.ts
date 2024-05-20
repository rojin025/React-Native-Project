import { createContext } from "react";
import {
  AuthorI,
  BookI,
  CatalogI,
  MemberI,
  PublisherI,
  TransactionI,
} from "../Types/Types";

interface ContextType {
  setLoggedIn: (value: boolean) => void;
  books: BookI[];
  setBooks: (books: BookI[]) => void;
  authors: AuthorI[];
  setAuthors: (authors: AuthorI[]) => void;
  publishers: PublisherI[];
  setPublishers: (publishers: PublisherI[]) => void;
  catalogs: CatalogI[];
  setCatalogs: (catalogs: CatalogI[]) => void;
  members: MemberI[];
  setMembers: (members: MemberI[]) => void;
  transactions: TransactionI[];
  setTransactions: (transactions: TransactionI[]) => void;
}

const initialContext = {
  catalogs: [],
  setCatalogs: () => {},
  setLoggedIn: () => {},
  books: [],
  setBooks: () => {},
  authors: [],
  setAuthors: () => {},
  publishers: [],
  setPublishers: () => {},
  members: [],
  setMembers: () => {},
  transactions: [],
  setTransactions: () => {},
};

const GlobalContext = createContext<ContextType>(initialContext);

export default GlobalContext;
