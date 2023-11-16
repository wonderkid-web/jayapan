"use client"
import supabse from '@/utils/supabse';
import { Button, Text, TextField } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid';

type Obat = {
    id: string;
    nama: string;
    jenis: string;
    harga: number;
    stock: number;
    created_at: string;
}

type CurrentStock = {
    id: string | undefined;
    stock: number | string;

}

const InputTransaksi = ({ data, typeTransaksi }: { data: Obat[], typeTransaksi: string }) => {
    const [temp, setTemp] = useState<Obat[]>([])
    const [currentStock, setCurrentStock] = useState<any>([])
    const router = useRouter()

    const handleInput = (e: any, obat: Obat) => {
        let obj: Obat;
        const { value } = e.target
        obj = {
            ...obat,
            id: obat.id,
            stock: +value
        }

        setTemp((prev: any) => {
            return [...prev, obj]
        })
    }


    const handleUpdate = async () => {
        if (temp.length > 0) {
            const unique: any = Object.values(temp.reduce((acc: any, obj: any) => {
                if (!acc[obj.id] || (acc[obj.id].stock || 0) < (obj.stock || 0)) {
                    acc[obj.id] = obj;
                }
                return acc;
            }, {})).map((obat: any, index: number) => {
                if (typeTransaksi === "transaksimasuk") {
                    const obat_ = {
                        ...obat,
                        stock: currentStock.find((stock:CurrentStock) => stock.id === obat.id).stock += obat.stock
                    }

                    const transaksi = {
                        id: uuid(),
                        obatId: obat.id,
                        jumlah: obat.stock,
                        nominal: obat.stock * +obat.harga
                    }
                    return {obat_, transaksi}
                } else {
                    const obat_ = {
                        ...obat,
                        stock: currentStock.find((stock:CurrentStock) => stock.id === obat.id).stock -= obat.stock
                    }

                    const transaksi = {
                        id: uuid(),
                        obatId: obat.id,
                        jumlah: obat.stock,
                        nominal: obat.stock * +obat.harga
                    }
                    return {obat_, transaksi}
                }
            });
            
            const allObat = unique.map((obat:any) =>obat.obat_)
            const allTransaksi = unique.map((obat:any) =>obat.transaksi)
            console.log(allObat)
            console.log(allTransaksi)
            try {
                const { data: dataObat, error: errorObat } = await supabse.from("obat").upsert(allObat).select()
                const {data, error} = await supabse.from(typeTransaksi).insert(allTransaksi)

                console.log(dataObat)
                console.log(errorObat)
                console.log(data)
                console.log(error)

                if (dataObat || error) {
                    router.push('/dashboard')
                    setTemp([])
                }
            }catch(err:any){
                console.error('Error at Input Transaksi: ', err.message );
            }
        } else {
            alert('kamu belum mengisi apapun')
        }
    }

    useEffect(() => {
        setCurrentStock((prev: any) => {
            const current = data.map(d => ({
                id: d.id,
                stock: d.stock
            }))
            return [...current]
        })
    }, [data])


    return (
        <>
            {data && data.map((obat: Obat) => (
                <div key={obat.id} className='flex flex-col text-center bg-slate-100 p-2 rounded-md'>
                    <h4>{obat.nama}</h4>
                    {obat.stock === 0 && <Text>Stock kamu lagi habis</Text>}
                    <div className="input flex gap-2">
                        <Button>-</Button>
                        {obat.stock}
                        <TextField.Input disabled={obat.stock === 0 && typeTransaksi == "transaksikeluar"} placeholder="110" variant='classic' width={200} onChange={(e) => handleInput(e, obat)} />
                        <Button>+</Button>
                    </div>
                </div>
            ))}
            <Button onClick={handleUpdate}>Kirim</Button>
        </>
    )
}

export default InputTransaksi