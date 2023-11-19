"use client"

import { createContext, useContext, useState } from "react";

export const AuthContext = createContext<any>(null)

export const AuthProvider = ({children} : {children: React.ReactNode}) =>{
    const [isLoggin, setIsLoggin] = useState<Boolean>(false)

    return (
        <AuthContext.Provider value={
            {isLoggin, setIsLoggin}
        }>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () =>{
    return useContext(AuthContext)
}

