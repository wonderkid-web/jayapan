"use client"
import supabse from '@/utils/supabse'
import React, { useEffect, useRef, useState } from 'react'
import uuid from 'react-uuid'
import { Button, Dialog, Flex, TextField } from '@radix-ui/themes'
import { toast } from 'sonner'


type Obat = {
    id: string;
    nama: string;
    jenis: string;
    harga: number | string;
    stock: number;
    created_at: string;
}

export const revalidate = 0;

export const ListUpdateHargaObat = () => {
    const [obat, setObat] = useState<Obat[]>([])
    const form = useRef(null)

    useEffect(() => {
        getData()
    }, [])

    const getData: () => void = async () => {
        const { data }: any = await supabse.from('obat').select("*")
        setObat(data)
    }

    const handleUpdateHarga = async (e: any, id: string) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const harga = Object.fromEntries(formData)
        const { data, error } = await supabse.from('obat').update(harga).eq('id', id).select()
        if (data) {
            getData()
            toast.success('Kamu berhasil update harga!', {
                classNames: {
                    toast: '!bg-emerald-400',
                    title: '!text-white',
                },
            })
        }else{
            toast.error('Kamu gagal update harga!', {
                classNames: {
                    toast: '!bg-rose-400',
                    title: '!text-white',
                },
            })
        }
    }

    const currency = (harga:any) =>{
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(harga)
    }

    return (
        <div className='grid grid-cols-4 grid-rows-4 items-between gap-2'>
            {obat && obat?.map((d: Obat) => (
                <div key={uuid()} className="border border-gray-300 h-fit rounded-lg p-4 max-w-xs flex flex-col gap-1">
                    <h3 className="text-lg text-white bg-emerald-500 w-fit p-1 rounded font-bold mb-2">{d.nama}</h3>
                    {/* <p className="self-end text-sm text-gray-500 italic">
                        {
                            format(addHours(new Date(d.created_at), 7), "dd-MM-yyyy HH:mm", { locale: localeId })
                        } </p> */}
                    <p className="mb-2"><span className="font-bold">Harga:</span>
                        {
                           currency(d.harga)
                        }</p>
                    <p className="mb-2"><span className="font-bold">Jenis:</span> {d.jenis}</p>
                    <p><span className="font-bold">Stock:</span> {d.stock}</p>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button color='jade'>update</Button>
                        </Dialog.Trigger>

                        <Dialog.Content style={{ maxWidth: 450 }}>
                            <Dialog.Title>Edit Harga Obat</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                                Ubah harga obat kamu disini.
                            </Dialog.Description>

                            <form onSubmit={(e) => handleUpdateHarga(e, d.id)} ref={form}>
                                <Flex direction="column" gap="3">
                                    <label>
                                        <TextField.Input
                                            name='harga'
                                            type='number'
                                            placeholder={currency(d.harga) as string}
                                            min={0}
                                        />
                                    </label>
                                    <div className='flex justify-end gap-2'>
                                        <Dialog.Close>
                                            <Button variant="soft" color="gray">
                                                Cancel
                                            </Button>
                                        </Dialog.Close>
                                        <Dialog.Close>
                                            <Button color='jade' type='submit'>Save</Button>
                                        </Dialog.Close>
                                    </div>
                                </Flex>
                            </form>
                        </Dialog.Content>
                    </Dialog.Root>
                </div>
            ))}
        </div>

    )
}
