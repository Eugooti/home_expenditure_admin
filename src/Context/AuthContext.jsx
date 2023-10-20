// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { getFromLocalStorage } from "../Utils/LocalStorage/localStorage.jsx";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = getFromLocalStorage('User');
    const authToken = getFromLocalStorage('authToken');

    useEffect(() => {
        // Check if both user and authToken exist and are not null
        if (user !== null && authToken !== null) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [user, authToken]);

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
