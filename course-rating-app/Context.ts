import { createContext } from "react";
import ICourse from "./components/ICourse";

interface ContextType {
  courses: ICourse[];
  setCourses: (courses: ICourse[]) => void;
}

const initialContext = {
  courses: [],
  setCourses: () => {},
};

const GlobalContext = createContext<ContextType>(initialContext);

export default GlobalContext;
