"use client"
import supabse from '@/utils/supabse'
import React, { useEffect, useState } from 'react'
import { ListUpdateHargaObat } from '@/app/components/master_data/ListUpdateHargaObat'
import { TextField } from '@radix-ui/themes'


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

    const getData = async () => {
        const { data }: any = await supabse.from('obat').select("*")
        return data
    }

    useEffect(() => {
        getData().then(data => {
            setBox(data)
        })
    }, [])


    const handleSearch = ((e: any) => {
        if (e.currentTarget.value) {
            const tempBox = box?.filter((obat: Obat) => {
                if (obat.nama.toLowerCase().includes(e.currentTarget.value)) {
                    return obat
                }
            })
            setBox(tempBox)
        } else {
            getData().then((res: any) => {
                setBox(res)
            })
        }
    })



    return (
        <div className='flex flex-col gap-2'>
            <h1>Manajemen Data Obat</h1>
            <TextField.Input placeholder='Cari Obat...' onChange={handleSearch} />
            <ListUpdateHargaObat />
        </div>
    )
}
