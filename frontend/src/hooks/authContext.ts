import { createContext } from "react";
import type { AdminUser } from "../types/auth";

export type AuthContextValue = {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
