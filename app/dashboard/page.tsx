import supabse from "@/utils/supabse"
import AuthTemplate from "../components/auth/AuthTemplate"
import uuid from "react-uuid";
import { addHours, format } from "date-fns";
import localeId from "date-fns/locale/id";


type Obat = {
  id: string;
  nama: string;
  jenis: string;
  harga: number;
  stock: number;
  created_at: string;
}


export default async function Dashboard() {

  const { data } = await supabse.from('obat').select()

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {
        data?.map((d: Obat) => (
          <div key={uuid()} className="border border-gray-300 w-[250px] rounded-lg p-4 max-w-xs flex flex-col">
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
          </div>

        ))
      }
      <AuthTemplate />
    </div>
  )
}
