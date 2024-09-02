"use client"
import supabse from '@/utils/supabse'
import { useEffect, useState } from 'react'
import { addHours, format } from 'date-fns'
import idLocale from 'date-fns/locale/id'
import TableLaporan from '@/app/components/laporan/TableLaporan'
import AuthTemplate from '@/app/components/auth/AuthTemplate'

export default function LaporanKeluar() {
  const [data, setData] = useState()

  const columns = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    //   cell: (props: any) => <p> {props.getValue()}</p>
    // },
    // {
    //   accessorKey: "obatId",
    //   header: "Obat ID",
    //   cell: (props: any) => <p> {props.getValue()}</p>
    // },
    {
      accessorKey: "namaObat",
      header: "Nama Obat",
      cell: (props: any) => <p> {props.getValue()}</p>
    },
    {
      accessorKey: "jumlah",
      header: "Jumlah",
      cell: (props: any) => <p> {props.getValue()}</p>
    },
    {
      accessorKey: "nominal",
      header: "Nominal",
      cell: (props: any) => <p> {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.getValue())}</p>
    },
    {
      accessorKey: "created_at",
      header: "Dibuat",
      cell: (props: any) => <p> {format(
        addHours(new Date(props.getValue()), 7), "dd-MM-yyyy HH:mm", { locale: idLocale }
      )}</p>


    },
  ]
  const getData = async () => {
    const { data }: { data: any } = await supabse.from('transaksikeluar').select("*")
    setData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  if (data) {
    return (
      <div>
        <AuthTemplate />

        <h1>Table Transaksi Keluar</h1>
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
        <TableLaporan columns={columns} datas={data} />
      </div>
    )
  }
}
