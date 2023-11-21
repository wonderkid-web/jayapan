"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AuthTemplate = () => {
    const router = useRouter()

    useEffect(() => {
        const status = localStorage.getItem('status')
        if(!status) router.push('/login')
    }, [router])

    return (
       <></>
    )


}

export default AuthTemplate