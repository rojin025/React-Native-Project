import { createContext } from "react";
import { IContact } from "./contacts";

type ContextType = {
  contacts: IContact[];
  setContacts: (contacts: IContact[]) => void;
};

const initailContext = {
  contacts: [],
  setContacts: () => {},
};

const GlobalContext = createContext<ContextType>(initailContext);

export default GlobalContext;
