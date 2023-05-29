import React, { createContext, useState } from "react";

const UserContext = createContext();

const Provider = ({ children }) => {
    const [profile, setProfile] = useState({
        isLoggedIn: false,
        isVenueManager: false,
        accessToken: "",
    });

    return (
        <UserContext.Provider value={{ profile, setProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, Provider };
