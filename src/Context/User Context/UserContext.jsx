import {createContext, useEffect, useState} from 'react';
import {getFromLocalStorage} from "../../Utils/LocalStorage/localStorage.jsx";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);



    useEffect(() => {
        const User=getFromLocalStorage("User")
        setUser(User?User:null);

    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
