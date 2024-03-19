import { React, createContext, useState, useContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [toke, setToken] = useState(null)

    const login = (user) => {
        setUser(user)

    }
    const login2 = (toke) => {
        setToken(toke)

    }

    const logout = () => {

        // localStorage.removeItem('myAuthorizationToken');
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ user, login,login2, logout,toke }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext)
} 