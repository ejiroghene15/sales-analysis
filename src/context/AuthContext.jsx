import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
//Auth functions (signin, signup, logout)

//Session state (user info, sign-in status)
    const [session, setSession] = useState('hi');

    return (
        <AuthContext value={{session, setSession}}>
            {children}
        </AuthContext>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};