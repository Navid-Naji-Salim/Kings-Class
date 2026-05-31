import { apiRequest } from "./api";
import type { AdminUser, LoginResponse } from "../types/auth";

const TOKEN_KEY = "kings-class-token";

export const authService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
  login(email: string, password: string) {
    return apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
  },
  me(token: string) {
    return apiRequest<{ user: AdminUser }>("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};
