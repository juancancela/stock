import React, { createContext, useContext } from "react";
import { SocketApplication } from "./index";

export const Context: React.Context<SocketApplication> = createContext(
  new SocketApplication()
);

export const useChat = () => useContext(Context);