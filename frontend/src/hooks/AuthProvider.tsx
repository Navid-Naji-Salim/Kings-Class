import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext";
import { authService } from "../services/authService";
import type { AdminUser } from "../types/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(authService.getToken()));

  useEffect(() => {
    const token = authService.getToken();

    if (!token) {
      return;
    }

    authService
      .me(token)
      .then(({ user: currentUser }) => setUser(currentUser))
      .catch(() => authService.clearToken())
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authService.login(email, password);
    authService.setToken(result.token);
    setUser(result.user);
  }, []);

  const logout = useCallback(() => {
    authService.clearToken();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, isLoading, login, logout }), [user, isLoading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
