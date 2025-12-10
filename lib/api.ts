// export const api = {
//   checkAuth: () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const token = localStorage.getItem("authToken");
//         resolve({
//           isAuthenticated: !!token,
//           user: token ? JSON.parse(localStorage.getItem("user")) : null,
//         });
//       }, 500);
//     });
//   },
//   login: (email, password) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const users = {
//           "admin@resto.com": {
//             role: "admin",
//             name: "Admin",
//             email: "admin@resto.com",
//           },
//           "manager@resto.com": {
//             role: "manager",
//             name: "Manager",
//             email: "manager@resto.com",
//           },
//           "serveur@resto.com": {
//             role: "serveur",
//             name: "Serveur",
//             email: "serveur@resto.com",
//           },
//           "cuisinier@resto.com": {
//             role: "cuisinier",
//             name: "Cuisinier",
//             email: "cuisinier@resto.com",
//           },
//         };
//         const user = users[email];
//         if (user) {
//           const token = "mock-token-" + Date.now();
//           localStorage.setItem("authToken", token);
//           localStorage.setItem("user", JSON.stringify(user));
//           resolve({ success: true, user, token });
//         } else {
//           resolve({ success: false, error: "Identifiants invalides" });
//         }
//       }, 1000);
//     });
//   },
//   logout: () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
//   },
// };

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
// Fonction utilitaire pour lire le token du cookie (client-only)
const getTokenFromCookie = () => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/authToken=([^;]+)/);
  return match ? match[1] : null;
};

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem("authToken");
      const cookieToken = getTokenFromCookie();
      const token = cookieToken || localToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      document.cookie = "authToken=; path=/; max-age=0";
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
