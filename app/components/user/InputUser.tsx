"use client"
import supabse from '@/utils/supabse'
import { Button, Callout, Select, TextField } from '@radix-ui/themes'
import React, { useRef, useState } from 'react'
import uuid from 'react-uuid'
import { FcApproval, FcBusinessman, FcLock } from "react-icons/fc";
import { FcDisclaimer } from "react-icons/fc";



const InputUser = () => {
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const form: null | any = useRef(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)


        const { error } = await supabse.from('akun').insert([payload]).select()
        if (error) {
            console.log(error)
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 1500)
            form.current.reset()
        } else {
            setSuccess(true)

            setTimeout(() => {
                setSuccess(false)
            }, 1500)
            form.current.reset()
        }
    }

    return (
        <form onSubmit={handleSubmit} ref={form}>
            <div className=' flex flex-col gap-y-2 w-[100%]'>
                <TextField.Root>
                    <TextField.Input placeholder="Username" name='username' />
                    <TextField.Slot>
                        <FcBusinessman />
                    </TextField.Slot>
                </TextField.Root>
                <TextField.Root>
                    <TextField.Input placeholder="Password" name='password' type='password' />
                    <TextField.Slot>
                        <FcLock />
                    </TextField.Slot>
                </TextField.Root>
                <Button>Buat Akun</Button>
                {success &&
                    <Callout.Root>
                        <Callout.Icon>
                            <FcApproval />
                        </Callout.Icon>
                        <Callout.Text>
                            Kamu berhasil menambahkan Akun baru.
                        </Callout.Text>
                    </Callout.Root>
                }
                {error &&
                    <Callout.Root color='red'>
                        <Callout.Icon>
                            <FcDisclaimer />
                        </Callout.Icon>
                        <Callout.Text>
                            Kamu gagal menambahkan Akun baru.
                        </Callout.Text>
                    </Callout.Root>
                }
            </div>
        </form>
    )
}

export default InputUser