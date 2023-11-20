"use client"
import supabse from '@/utils/supabse'
import { addHours, format } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import uuid from 'react-uuid'
import localeId from "date-fns/locale/id"
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes'


type Obat = {
    id: string;
    nama: string;
    jenis: string;
    harga: number;
    stock: number;
    created_at: string;
}


export default function Update() {
    const [box, setBox] = useState([])
    const [harga, setHarga] = useState<any[]>([])
    const form = useRef(null)
    const btn = useRef(null)

    const getData = async () => {
        const { data }: any = await supabse.from('obat').select("*")
        setBox(data)
    }

    useEffect(() => {
        getData()
    }, [])

    const handleUpdateHarga = async (e: any, id:string) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const harga = Object.fromEntries(formData)
        const {data, error} = await supabse.from('obat').update(harga).eq('id', id).select()
        if(data){
            getData()
        }
    }

    return (
        <div className='grid grid-cols-4 grid-rows-4 items-between gap-2'>

            {box && box?.map((d: Obat) => (
                <div key={uuid()} className="border border-gray-300 h-fit rounded-lg p-4 max-w-xs flex flex-col gap-1">
                    <h3 className="text-lg text-white bg-emerald-500 w-fit p-1 rounded font-bold mb-2">{d.nama}</h3>
                    <p className="self-end text-sm text-gray-500 italic">
                        {
                            format(addHours(new Date(d.created_at), 7), "dd-MM-yyyy HH:mm", { locale: localeId })
                        } </p>
                    <p className="mb-2"><span className="font-bold">Harga:</span>
                        {
                            new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(d.harga)
                        }</p>
                    <p className="mb-2"><span className="font-bold">Jenis:</span> {d.jenis}</p>
                    <p><span className="font-bold">Stock:</span> {d.stock}</p>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button>Edit Harga Obat</Button>
                        </Dialog.Trigger>

                        <Dialog.Content style={{ maxWidth: 450 }}>
                            <Dialog.Title>Edit Harga Obat</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                                Ubah harga obat kamu disini.
                            </Dialog.Description>

                            <form onSubmit={(e)=>handleUpdateHarga(e, d.id)} ref={form}>
                                <Flex direction="column" gap="3">
                                    <label>
                                        <TextField.Input
                                            name='harga'
                                            type='number'
                                            placeholder="Masukan angka lebih dari 0"
                                        />
                                    </label>
                                    <div className='flex justify-end gap-2'>
                                    <Dialog.Close>
                                        <Button variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </Dialog.Close>
                                    <Dialog.Close>
                                        <Button type='submit'>Save</Button>
                                    </Dialog.Close>
                                    </div>
                                </Flex>
                            </form>
                        </Dialog.Content>
                    </Dialog.Root>
                </div>
            ))
            }
        </div>
    )
}
