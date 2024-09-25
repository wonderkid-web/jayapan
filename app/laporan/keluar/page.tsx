"use client";
import supabse from "@/utils/supabse";
import { useEffect, useState } from "react";
import { addHours, format } from "date-fns";
import idLocale from "date-fns/locale/id";
import AuthTemplate from "@/app/components/auth/AuthTemplate";
import dynamic from "next/dynamic";
const TableLaporan = dynamic(() => import('@/app/components/laporan/TableLaporan'), { ssr: false })

export default function LaporanKeluar() {
  const [data, setData] = useState<any[]|null>([]);

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
      cell: (props: any) => <p> {props.getValue()}</p>,
    },
    {
      accessorKey: "jumlah",
      header: "Jumlah",
      cell: (props: any) => <p> {props.getValue()}</p>,
    },
    {
      accessorKey: "nominal",
      header: "Nominal",
      cell: (props: any) => (
        <p>
          {" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(props.getValue())}
        </p>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Dibuat",
      cell: (props: any) => (
        <p>
          {" "}
          {format(addHours(new Date(props.getValue()), 7), "dd-MM-yyyy HH:mm", {
            locale: idLocale,
          })}
        </p>
      ),
    },
  ];

  const getData = async () => {
    const { data } = await supabse
      .from("transaksikeluar")
      .select("*")
      .limit(100); // Batasi jumlah data
    if (data) {
      setData(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data) {
    return (
      <div>
        <AuthTemplate />

        <h1>Table Transaksi Keluar</h1>
        <TableLaporan columns={columns} datas={data} />
      </div>
    );
  }
}
