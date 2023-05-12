"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextProps {
  username: string;
  setUserName: Dispatch<SetStateAction<string>>;
  secret: string;
  setSecret: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
  username: "",
  setUserName: (): string => "",
  secret: "",
  setSecret: (): string => "",
});

export const GlobalContextProvider = ({ children }) => {
  const [username, setUserName] = useState("");
  const [secret, setSecret] = useState("");

  return (
    <GlobalContext.Provider
      value={{ username, setUserName, secret, setSecret }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
