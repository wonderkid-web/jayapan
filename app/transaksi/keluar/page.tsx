"use client"
import AuthTemplate from '@/app/components/auth/AuthTemplate'
import InputTransaksi from '@/app/components/transaksi/InputTransaksi'
import supabse from '@/utils/supabse'
import { Callout, TextField } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { FcDisclaimer } from 'react-icons/fc'

export default function TransaksiKeluar() {
  const [box, setBox] = useState<any[] | null>()

  const getData = async () => {
    const { data } = await supabse.from('obat').select("*")
    return data
  }

  const handleSearch = ((e: any) => {
    let latestBox = box
    if(e.currentTarget.value){
      const tempBox = box?.filter(obat => {
        if (obat.nama.toLowerCase().includes(e.currentTarget.value)) {
          return obat
        }
      })
      setBox(tempBox)
    }else{
      getData().then(res=>{
        setBox(res)
      })
    }
  })

  useEffect(() => {
    getData().then(data => {
      setBox(data)
    })
  }, [])


  return (
    <div className='flex flex-col gap-2'>
      <AuthTemplate />
      <h1>Transaksi Keluar</h1>
      <TextField.Input placeholder='Cari Obat...' onChange={handleSearch} />
      {box && <InputTransaksi data={box} typeTransaksi='transaksikeluar' />}
      {box?.length == 0 &&
        <Callout.Root>
          <Callout.Icon>
            <FcDisclaimer />
          </Callout.Icon>
          <Callout.Text>
            Obat yang kamu cari, tidak ditemukan!
          </Callout.Text>
        </Callout.Root>
      }
    </div>
  )
}
