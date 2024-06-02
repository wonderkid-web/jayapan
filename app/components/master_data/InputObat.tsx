"use client"
import supabse from '@/utils/supabse'
import { Button, Callout, Select, TextField } from '@radix-ui/themes'
import React, { useRef, useState } from 'react'
import uuid from 'react-uuid'
import { FcApproval } from "react-icons/fc";
import { FcDisclaimer } from "react-icons/fc";



const InputObat = () => {
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const form: null | any = useRef(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)
        payload.id = uuid()

        const {data, error} = await supabse.from('obat').insert([payload]).select()
        const {data:dataTM, error:errorTM} = await supabse.from('transaksimasuk').insert([{
            id: uuid(),
            obatId: payload.id,
            jumlah: payload.stock,
            nominal: payload.harga,
            namaObat: payload.nama
        }]).select()
        if(error){
            console.log(error)
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 1500)
            form.current.reset()
        }else{
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
                <TextField.Input placeholder="Nama Obat" name='nama' />
                <TextField.Input placeholder="Stock" type='number' name='stock' />
                <TextField.Input placeholder="Harga" name='harga' />
                <Select.Root defaultValue="pill" name='jenis'>
                    <Select.Trigger />
                    <Select.Content position="popper">
                        <Select.Item value="pill">Obat Pill</Select.Item>
                        <Select.Item value="cair">Obat Cair</Select.Item>
                        <Select.Item value="bubuk">Obat Bubuk</Select.Item>
                    </Select.Content>
                </Select.Root>
                <Button>Tambah Obat</Button>
                {success &&
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
                }
            </div>
        </form>
    )
}

export default InputObat