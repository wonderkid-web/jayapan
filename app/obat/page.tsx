import supabse from '@/utils/supabse'
import { addHours, format } from 'date-fns'
import React from 'react'
import uuid from 'react-uuid'
import localeId from "date-fns/locale/id"
import { RiWhatsappLine } from "react-icons/ri";
import Link from 'next/link'
import { Button } from '@radix-ui/themes'


type Obat = {
    id: string;
    nama: string;
    jenis: string;
    harga: number;
    stock: number;
    created_at: string;
}


export default async function page() {

    const { data }: any = await supabse.from('obat').select("*")


    const urlTemplate = (namaObat: string) => {
        return `https://wa.me/6283191319297?text=Hallo Admin apakah obat ${namaObat} tersedia?`.replace(/ /g, "%20")

    }


    return (
        <div className='grid grid-cols-4 grid-rows-4 items-between gap-2'>
            {data?.map((d: Obat) => (
                <div key={uuid()} className="border border-gray-300 h-fit rounded-lg p-4 max-w-xs flex flex-col">
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
                    <Link className='self-end' href={urlTemplate(d.nama)}>
                        <Button>
                            <RiWhatsappLine />
                        </Button>
                    </Link>
                </div>
            ))}
        </div>
    )
}
