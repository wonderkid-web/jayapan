"use client"
import AuthTemplate from '@/app/components/auth/AuthTemplate'
import InputTransaksi from '@/app/components/transaksi/InputTransaksi'
import supabse from '@/utils/supabse'
import React, { useEffect, useState } from 'react'

export default function TransaksiMasuk() {
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
    <div className='mx-auto w-[900px] flex flex-col gap-2'>
      <AuthTemplate />
      <h1>Transaksi Masuk</h1>
      {box && <InputTransaksi data={box} typeTransaksi='transaksimasuk' />}
    </div>
  )
}
