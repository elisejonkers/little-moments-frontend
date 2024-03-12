import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL

interface User {
    email: string,
    password: string,
    firstName: string
}

interface AuthContextType {
    isLoggedIn: boolean,
    isLoading: boolean,
    user: User | null
    storeToken: (token: string) => void,
    authenticateUser: () => void;
    logOutUser: () => void
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
    storeToken: () => {},
    authenticateUser: () => {},
    logOutUser: () => {}
})

type AuthProviderProps = {
    children: React.ReactNode
}

const AuthProviderWrapper: React.FC<AuthProviderProps> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    const authenticateUser = () => {       
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
            axios.get(
                `${apiURL}/auth/verify`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
                .then((response) => {
                    const user = response.data;       
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user);
                })
                .catch((error) => {      
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                });
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }

    const removeToken = () => {                 
        localStorage.removeItem("authToken");
      }
     
     
      const logOutUser = () => {             
        removeToken();   
        authenticateUser();
      }

    useEffect(() => {                                   
        authenticateUser()
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };
