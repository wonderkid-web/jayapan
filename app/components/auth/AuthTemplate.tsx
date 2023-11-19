"use client"
import { useAuthContext } from '@/app/context/authContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AuthTemplate = () => {
    const { isLoggin } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (!isLoggin) router.push('/login')
    }, [isLoggin, router])

    return (
       <></>
    )


}

export default AuthTemplate