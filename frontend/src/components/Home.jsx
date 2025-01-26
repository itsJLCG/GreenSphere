import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(location.state?.user || null);
    const [loading, setLoading] = useState(!user);

    useEffect(() => {
        // If `user` is not already available, fetch it from the server
        if (!user) {
            axios.get('http://localhost:3001/user', { withCredentials: true })
                .then(response => {
                    if (response.data.user) {
                        setUser(response.data.user);
                    } else {
                        navigate("/login"); // Redirect to login if no user is found
                    }
                })
                .catch(() => navigate("/login")) // Handle errors by redirecting to login
                .finally(() => setLoading(false)); // Stop loading after the process
        } else {
            setLoading(false); // Stop loading if `user` is already present
        }
    }, [user, navigate]);

    // Show a loading indicator until the data is ready
    if (loading) {
        return (
            <center>
                <h1>Loading...</h1>
            </center>
        );
    }

    return (
        <center>
            <h1 style={{ color: "black", fontSize: "5rem" }}>
                Welcome Home, {user?.name || "Guest"}!
            </h1>
        </center>
    );
};

export default Home;
