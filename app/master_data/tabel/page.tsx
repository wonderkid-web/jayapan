"use client"
import AuthTemplate from '@/app/components/auth/AuthTemplate';

import { useAuthContext } from '@/app/context/authContext';
import supabse from '@/utils/supabse'
import { addHours, format } from 'date-fns';
import idLocale from 'date-fns/locale/id';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner';
const TableLaporan = dynamic(() => import('@/app/components/laporan/TableLaporan'), { ssr: false })

type Obat = {
  id: string;
  nama: string;
  jenis: string;
  harga: number;
  stock: number;
  created_at: string;
}


export default function TabelOBat() {
  
  const router = useRouter()

  const { isLoggin } = useAuthContext()

  const [data, setData] = useState<Obat[] | any>()

  const getData = async () => {
    const { data }: { data: any } = await supabse.from('obat').select("*")

    const redefine = data.map((d: any) => {
      Object.values(d).forEach(item => {
        if (typeof item != 'string') {
          String(item)
        }
      })
      return {
        ...d,
        harga: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(d.harga),
      }
    })

    setData(redefine)
  }

  useEffect(() => {
    getData()
  }, [])

    
  const columns = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    //   cell: (props: any) => <p> {props.getValue()}</p>
    // },
    {
      accessorKey: "nama",
      header: "Nama Obat",
      cell: (props: any) => <p> {props.getValue()}</p>
    },
    {
      accessorKey: "jenis",
      header: "Jenis",
      cell: (props: any) => <p> {props.getValue()}</p>
    },
    {
      accessorKey: "harga",
      header: "Harga/Pcs",
      cell: (props: any) => <p> {props.getValue()}</p>
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: (props: any) => <p> {props.getValue()}</p>
    },
    {
      accessorKey: "created_at",
      header: "Dibuat",
      cell: (props: any) => <p> {format(
        addHours(new Date(props.getValue()), 7), "dd-MM-yyyy HH:mm", { locale: idLocale }
      )}</p>
    },
    {
      accessorKey: "id",
      header: "",
      cell: (props: any) => {
        const id = props.getValue()
  
        const handleDelete = async (id:string) =>{
          const {status} = await supabse.from('obat').delete().eq("id", id)
  
          if(status == 204){
            toast.success("Berhasil di hapus")
            getData()
          }
          
  
        }
  
        return <button className='px-2 py-1 text-white rounded-sm hover:scale-105 bg-red-500' onClick={()=>handleDelete(id)}>delete</button>
      }
    },
  ]

  return (
    <div className='flex flex-col items-center justify-center mt-[-100px]'>
      <Toaster />
      <AuthTemplate />
      <h1 className='text-lg'>Tabel Obat</h1>
      <TableLaporan columns={columns} datas={data} />
    </div>
  )
}
