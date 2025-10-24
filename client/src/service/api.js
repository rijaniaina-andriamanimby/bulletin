import axios from "axios";

const BASE_URL = "http://localhost:8000/";

const api = axios.create({
    baseURL: BASE_URL,
});

// Intercepteur pour rafraîchir le token automatiquement
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si l'erreur est 401 (token expiré)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refresh = localStorage.getItem("refresh_token");
                const res = await axios.post(`${BASE_URL}/token/refresh/`, { refresh });

                const newAccess = res.data.access;
                localStorage.setItem("access_token", newAccess);

                // On met à jour l’en-tête et on relance la requête d’origine
                originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Erreur de refresh token :", refreshError);
                localStorage.clear(); // tout nettoyer
                window.location.href = "/"; // redirection login
            }
        }

        return Promise.reject(error);
    }
);

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
