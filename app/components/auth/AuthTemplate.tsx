"use client"
import { useAuthContext } from '@/app/context/authContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AuthTemplate = () => {
    const { isLoggin } = useAuthContext()
    const router = useRouter()

    if(router){
        useEffect(() => {
            console.log(`its from template!!!`, isLoggin)
            if(!isLoggin) router.push('/login')
        }, [isLoggin])
    
        return (
            <div>
               
            </div>
        )
    }

}

export default AuthTemplate