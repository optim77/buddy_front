// src/services/authService.ts
import axios from 'axios';

const API_URL = "https://example.com/api"; // Zastąp swoim adresem API

const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem("token", response.data.token);
};

const register = async (email: string, password: string) => {
    await axios.post(`${API_URL}/register`, { email, password });
};

const authService = {
    login,
    register,
};

export default authService;
