import supabse from "@/utils/supabse"
import AuthTemplate from "../components/auth/AuthTemplate"
import { addHours, format } from "date-fns";
import idLocale from "date-fns/locale/id"


type Obat = {
  id: string;
  nama: string;
  jenis: string;
  harga: number;
  stock: number;
  created_at: string;
}

type Transaksi = {
  nominal: number;
}


export default async function Dashboard() {

  const { data: obat_terakhir }: any = await supabse.from('obat').select("*").order('created_at', { ascending: false }).range(0, 0)
  const { data: total_transaksi_masuk }: any = await supabse.from('transaksimasuk').select("nominal")
  const { data: total_transaksi_keluar }: any = await supabse.from('transaksikeluar').select("nominal")
  const { data: transaksi_masuk_terakhir }: any = await supabse.from('transaksimasuk').select("*, obat(nama)").order('created_at', { ascending: false }).range(0, 0)
  const { data: transaksi_keluar_terakhir }: any = await supabse.from('transaksikeluar').select("*, obat(nama)").order('created_at', { ascending: false }).range(0, 0)

  const pengeluaran = total_transaksi_masuk.reduce((acc: number, curr: Transaksi) => acc + curr.nominal, 0)
  const pemasukan = total_transaksi_keluar.reduce((acc: number, curr: Transaksi) => acc + curr.nominal, 0)

  return (
    <div className="grid xl:grid-cols-3 sm:grid-cols-1 gap-2">
      {/* Card 1 - Latest Medicine */}
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <h3 className="text-lg font-bold mb-2">Obat Terakhir Ditambah</h3>
        <p>ID: {obat_terakhir[0]?.id}</p>
        <p>Nama: {obat_terakhir[0]?.nama}</p>
        <p>Jenis: {obat_terakhir[0]?.jenis}</p>
        <p>Ditambah: {
          format(
            addHours(new Date(obat_terakhir[0]?.created_at), 7), "dd-MM-yyyy HH:mm", { locale: idLocale }
          )
        }</p>
        {/* Add more details as needed */}
      </div>

      {/* Card 2 - Total Incoming Transactions */}
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <h3 className="text-lg font-bold mb-2">Total Pengeluaran</h3>
        <p>Jumlah: {new Intl.NumberFormat('id-ID', { currency: 'IDR', style: 'currency', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(pengeluaran)}</p>
        {/* Add more details as needed */}
      </div>

      {/* Card 2 - Total Incoming Transactions */}
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <h3 className="text-lg font-bold mb-2">Total Pemasukan</h3>
        <p>Jumlah: {new Intl.NumberFormat('id-ID', { currency: "IDR", style: 'currency', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(pemasukan)}</p>
        {/* Add more details as needed */}
      </div>

      {/* Card 2 - Total Incoming Transactions */}
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <h3 className="text-lg font-bold mb-2">Total Transaksi Masuk</h3>
        <p>Jumlah: {total_transaksi_masuk?.length}</p>
        {/* Add more details as needed */}
      </div>

      {/* Card 3 - Total Outgoing Transactions */}
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <h3 className="text-lg font-bold mb-2">Total Transaksi Keluar</h3>
        <p>Jumlah: {total_transaksi_keluar?.length}</p>
        {/* Add more details as needed */}
      </div>

      {/* Card 4 - Latest Incoming Transaction */}
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <h3 className="text-lg font-bold mb-2">Transaksi Masuk Terakhir</h3>
        <p>ID: {transaksi_masuk_terakhir[0]?.id}</p>
        <p>ID: {transaksi_masuk_terakhir[0]?.obat.nama}</p>
        {/* Add more details as needed */}
      </div>

      {/* Card 5 - Latest Outgoing Transaction */}
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
        <h3 className="text-lg font-bold mb-2">Transaksi Keluar Terakhir</h3>
        <p>ID: {transaksi_keluar_terakhir[0].id}</p>
        <p>ID: {transaksi_keluar_terakhir[0].obat.nama}</p>
        {/* Add more details as needed */}
      </div>
      {/* {
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
      } */}
      <AuthTemplate />
    </div>
  )
}
