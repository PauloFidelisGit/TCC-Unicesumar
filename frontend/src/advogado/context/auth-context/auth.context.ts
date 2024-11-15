import { createContext } from "react";
import { AuthReducerType } from "./auth.reducer";

export const AuthContext = createContext<AuthReducerType>(
  {} as AuthReducerType,
);
