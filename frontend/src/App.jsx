import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Feedback from './components/Feedback';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const IsLoggedInContext = createContext();
export const SetIsLoggedInContext = createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/user', { withCredentials: true })
            .then(response => {
                if (response.data.user) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch(() => setIsLoggedIn(false));
    }, []);

    return (
        <IsLoggedInContext.Provider value={isLoggedIn}>
            <SetIsLoggedInContext.Provider value={setIsLoggedIn}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <Signup />} />
                        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
                        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/feedback" element={isLoggedIn ? <Feedback /> : <Navigate to="/login" />} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer position="top-right" autoClose={3000} />
            </SetIsLoggedInContext.Provider>
        </IsLoggedInContext.Provider>
    );
}

export default App;
