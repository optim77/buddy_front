import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from "./componenets/landing/LandingPage";
import Login from "./componenets/auth/SignIn";
import Register from "./componenets/auth/Register";
import Navbar from "./componenets/elements/Navbar";
import Dashboard from "./componenets/Dashboard";
import SignUp from "./componenets/auth/SignUp";
import Registered from "./pages/Registered";

const AppRouter: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <Router>

            <Navbar />
            <Routes>
                <Route path="/" element={isAuthenticated ? <Dashboard /> : <LandingPage />} />
                <Route path="/sign-in" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/sign-up" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />

                {/*pages*/}
                <Route path="/registered" element={<Registered />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;