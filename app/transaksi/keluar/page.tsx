"use client"
import AuthTemplate from '@/app/components/auth/AuthTemplate'
import InputTransaksi from '@/app/components/transaksi/InputTransaksi'
import supabse from '@/utils/supabse'
import { useEffect, useState } from 'react'

export default function TransaksiKeluar() {
  const [box, setBox] = useState<any[] | null>()

  const getData = async () => {
    const { data } = await supabse.from('obat').select("*")
    return data
  }
  useEffect(() => {
    getData().then(data => {
      setBox(data)
    })
  }, [])

  return (
    <div className='flex flex-col gap-2'>
      <AuthTemplate />
      <h1>Transaksi Keluar</h1>
      {box && <InputTransaksi data={box} typeTransaksi='transaksikeluar' />}
    </div>
  )
}
