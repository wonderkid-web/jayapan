"use client"
import { useRouter } from "next/navigation"
import { useAuthContext } from "../context/authContext"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button, TextField } from "@radix-ui/themes"

export default function Page() {
    const { isLoggin, setIsLoggin } = useAuthContext()
    const router = useRouter()
    const form : any = useRef(null)

    const handleLogin = ((e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const { username, password } = Object.fromEntries(formData)

        if (username === "admin" && password === "admin") {
            setIsLoggin(true)
        }

        form.current.reset()
    })

    useEffect(() => {
        console.log(`from login`, isLoggin)
        if (isLoggin) {
            router.push('/master_data/tabel')
        }
    }, [isLoggin])

    if (isLoggin) {
        return (
            <h1 className="text-xl">Kamu sudah login...</h1>
        )
    }

    return (
        <div className="flex flex-col items-center gap-y-3 w-screen">
            <h1>LOGIN</h1>
            <Link href={'/dashboard'}>go to dashboard without login!</Link>
            <form ref={form} onSubmit={handleLogin} className='flex flex-col gap-y-2 w-[250px]'>

                <TextField.Input placeholder="Username.." name='username' />
                <TextField.Input placeholder="Password" type="password" name='password' />
                <Button>Tambah Obat</Button>
                {/* {success &&
                    <Callout.Root>
                        <Callout.Icon>
                            <FcApproval />
                        </Callout.Icon>
                        <Callout.Text>
                            Kamu berhasil menambahkan obat baru.
                        </Callout.Text>
                    </Callout.Root>
                }
                {error &&
                    <Callout.Root color='red'>
                        <Callout.Icon>
                            <FcDisclaimer />
                        </Callout.Icon>
                        <Callout.Text>
                            Kamu gagal menambahkan obat baru.
                        </Callout.Text>
                    </Callout.Root>
                } */}
            </form>

        </div>
    )
}
