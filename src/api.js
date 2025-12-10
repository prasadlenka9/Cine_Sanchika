const API_URL = import.meta.env.VITE_BACKEND_URL;

export const api = {
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  signup: async (data) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  addFavorite: async (movieId, token) => {
    const res = await fetch(`${API_URL}/api/user/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ movieId }),
    });
    return res.json();
  },

  getFavorites: async (token) => {
    const res = await fetch(`${API_URL}/api/user/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};
