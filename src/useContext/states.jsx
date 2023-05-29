import React, { createContext, useState } from "react";

const UserContext = createContext();

const Provider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        isVenueManager: false,
        accessToken: "",
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, Provider };
