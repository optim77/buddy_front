import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from "./componenets/landing/LandingPage";
import Login from "./componenets/auth/SignIn";
import Register from "./componenets/auth/Register";
import Navbar from "./componenets/elements/Navbar";
import Dashboard from "./componenets/Dashboard";

const AppRouter: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={isAuthenticated ? <Dashboard /> : <LandingPage />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;