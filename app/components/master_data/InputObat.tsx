"use client"
import supabse from '@/utils/supabse'
import { Button, Callout, Select, TextField } from '@radix-ui/themes'
import React, { useRef } from 'react'
import uuid from 'react-uuid'

const InputObat = () => {
    const form : null | any = useRef(null)

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)
        payload.id = uuid()

        const {data, error} = await supabse.from('obat').insert([payload]).select()
        const {data:dataTM, error:errorTM} = await supabse.from('transaksimasuk').insert([{
            id: uuid(),
            obatId: payload.id,
            jumlah: payload.stock,
            nominal: payload.harga
        }]).select()
        if(error){
            console.log(error)
            form.current.reset()
        }else{
            console.log(data)
            form.current.reset()
        }

    }

    return (
        <form onSubmit={handleSubmit} ref={form}>
            <div className='flex flex-col gap-y-2'>
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
            </div>
        </form>
    )
}

export default InputObat