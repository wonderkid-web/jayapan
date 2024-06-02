"use client"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { Button, Callout, TextField } from "@radix-ui/themes"
import supabse from "@/utils/supabse"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { FcDisclaimer } from "react-icons/fc"

type User = {
    username: string;
    password: string;
}

export default function Page() {
    const [status, setStatus] = useState<any>("")
    const [user, setUser] = useState<User[] | null>([])
    const [err, setError] = useState<boolean>(false)
    const router = useRouter()
    const form: any = useRef(null)

    useEffect(() => {
        getAllUser()
        const status = localStorage.getItem('status')
        setStatus(status)
    }, [])

    const getAllUser = async () => {
        try {
            const { data } = await supabse.from('akun').select('username, password')
            setUser(data)
        } catch (e: any) {
            console.log('gagal get All User', e.message)
        }
    }

    const handleLogin = ((e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const { username, password }: any = Object.fromEntries(formData)
        const allUsername = user?.map(u => u.username)
        console.log(allUsername)
        if (allUsername?.includes(username)) {
            const checkUser = user?.find(u => u.username === username)
            if (checkUser?.username === username && checkUser?.password === password) {
                localStorage.setItem("status", "true")
                router.push('/dashboard')
            } else {
                setError(true)
                setTimeout(() => setError(false), 2500)
            }
        } else {
            setError(true)
            setTimeout(() => setError(false), 2500)
        }
        form.current.reset()
    })

    if (status) {
        return (
            <h1 className="text-xl">Kamu sudah login...</h1>
        )
    }

    return (
        <div className="flex flex-col items-center gap-y-3 w-screen">
            <h1>LOGIN</h1>
            <form ref={form} onSubmit={handleLogin} className='flex flex-col gap-y-2 w-[250px]'>

                <TextField.Input placeholder="Username.." name='username' />
                <TextField.Input placeholder="Password" type="password" name='password' />
                <Button>Login</Button>
                {/* {success &&
                    <Callout.Root>
                        <Callout.Icon>
                            <FcApproval />
                        </Callout.Icon>
                        <Callout.Text>
                            Kamu berhasil menambahkan obat baru.
                        </Callout.Text>
                    </Callout.Root>
                } */}
                {
                    err &&
                    <Callout.Root color='red'>
                        <Callout.Icon>
                            <FcDisclaimer />
                        </Callout.Icon>
                        <Callout.Text>
                            Username atau Password kamu Salah!
                        </Callout.Text>
                    </Callout.Root>
                }
            </form>

        </div>
    )
}
