import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from "./componenets/landing/LandingPage";
import Login from "./componenets/auth/SignIn";
import Register from "./componenets/auth/Register";
import Navbar from "./componenets/elements/Navbar";
import Dashboard from "./componenets/Dashboard";
import SignUp from "./componenets/auth/SignUp";
import Registered from "./pages/Registered";
import Explore from './componenets/explore/Explore';
import Account from "./componenets/account/Account";
import Create from "./componenets/create/Create";
import {getCookie} from "typescript-cookie";
import Profile from "./componenets/profile/Profile";
import Media from "./componenets/media/Media";

import EditMedia from "./componenets/media/EditMedia";
import Tag from "./componenets/tag/Tag";
import User from "./componenets/user/User";
import Loops from "./componenets/loops/Loops";
import Followers from "./componenets/follows/followers/Followers";
import Following from "./componenets/follows/following/Following";

const AppRouter: React.FC = () => {
    const isAuthenticated = !!getCookie("buddy-token");

    return (
        <Router>

            <Navbar />
            <Routes>
                <Route path="/" element={isAuthenticated ? <Dashboard /> : <LandingPage />} />
                <Route path="/sign-in" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/sign-up" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/sign-in" />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/sign-in" />} />
                <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/sign-in" />} />
                <Route path="/create" element={isAuthenticated ? <Create /> : <Navigate to="/sign-in" />} />
                <Route path="/image/:imageId" element={<Media />} />
                <Route path="/edit/:imageId" element={isAuthenticated ? <EditMedia /> : <Navigate to="/login" />} />
                <Route path="/followers" element={isAuthenticated ? <Followers /> : <Navigate to="/login" />} />
                <Route path="/following" element={isAuthenticated ? <Following /> : <Navigate to="/login" />} />
                <Route path="/tag/:tag" element={<Tag />} />
                <Route path="/user/:userId" element={<User />} />
                <Route path="/loops" element={<Loops />} />

                {/*pages*/}
                <Route path="/registered" element={<Registered />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;