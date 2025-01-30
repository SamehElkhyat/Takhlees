import { createContext, useState } from "react";

export const IdContext = createContext();

export function IdProvider({ children }) {
  const [id, setId] = useState("");

  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
}
