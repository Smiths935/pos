import api from "@/lib/api";
import type { NextRequest } from "next/server";

export interface User {
  role: string;
  name: string;
  email: string;
}

export const checkAuth = async (): Promise<{
  isAuthenticated: boolean;
  user: User | null;
}> => {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, user: null };
  }

  const token = localStorage.getItem("authToken");
  console.log("Auth check - authToken:", token);
  const userStr = localStorage.getItem("user");
  console.log("Auth check - user:", userStr);

  if (token && userStr) {
    try {
      return { isAuthenticated: true, user: JSON.parse(userStr) };
    } catch {
      return { isAuthenticated: false, user: null };
    }
  }

  return { isAuthenticated: false, user: null };
};

export const login = async (email: string, password: string) => {
  try {
    // Appel réel à votre backend Django
    // const response = await api.post('/auth/login/', { email, password })
    // const { token, user } = response.data

    // SIMULATION pour la démo (à remplacer par l'appel réel)
    const users: Record<string, User> = {
      "admin@resto.com": {
        role: "admin",
        name: "Admin",
        email: "admin@resto.com",
      },
      "manager@resto.com": {
        role: "manager",
        name: "Manager",
        email: "manager@resto.com",
      },
      "serveur@resto.com": {
        role: "serveur",
        name: "Serveur",
        email: "serveur@resto.com",
      },
      "cuisinier@resto.com": {
        role: "cuisinier",
        name: "Cuisinier",
        email: "cuisinier@resto.com",
      },
    };

    const user = users[email];
    if (user) {
      const token = "mock-token-" + Date.now();
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      document.cookie = `authToken=${token}; path=/; max-age=86400;`;
      document.cookie = `user=${encodeURIComponent(
        JSON.stringify(user)
      )}; path=/; max-age=86400;`;
      return { success: true, user, token };
    }

    return { success: false, error: "Identifiants invalides" };
  } catch (error) {
    return { success: false, error: "Erreur de connexion" };
  }
};

export const logout = async () => {
  // Appel API si nécessaire
  // await api.post('/auth/logout/')

  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    document.cookie = `authToken=; path=/; max-age=0;`;
  }
};
