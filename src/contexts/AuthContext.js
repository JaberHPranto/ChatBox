import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

// creating context
const AuthContext = React.createContext();

// making the context accessible 
export const useAuth = () => useContext(AuthContext)

// Provider -> where state management happens
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const history = useHistory()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
            if(user) history.push("/chats")
        })
    }, [user,history])

    const value = {user}
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
