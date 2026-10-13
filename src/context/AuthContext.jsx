import {createContext, useContext, useEffect, useState} from 'react';
import supabase from '../supabase-client';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);

    useEffect(() => {
        async function getInitialSession() {
            try {
                const {data, error} = await supabase.auth.getSession();

                if (error) throw error;

                setSession(data.session);
            } catch (error) {
                console.error('Error getting session:', error.message);
            }
        }

        getInitialSession()

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            console.log('Session changed:', session);
        })

    }, []);

    const signInUser = async (email, password) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email.toLowerCase(),
                password: password,
            })
            if (error) {
                return {success: false, error: error.message};
            }
            return {success: true, data};
        } catch (error) {
            console.error('Unexpected error during sign-in:', error.message);
            return {success: false, error: 'An unexpected error occurred. Please try again.'};
        }
    }


    return (
        <AuthContext value={{session, signInUser}}>
            {children}
        </AuthContext>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};