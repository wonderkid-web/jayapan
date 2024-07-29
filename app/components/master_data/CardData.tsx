import supabse from "@/utils/supabse"
import { Separator } from "@radix-ui/themes";
import { addHours, differenceInDays, differenceInHours, format, formatDistanceToNow, parseISO } from "date-fns";
import localeId from "date-fns/locale/id"
import { FcBearish, FcBullish, FcExport, FcImport, FcLike, FcSalesPerformance, FcSynchronize } from "react-icons/fc";


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

export const revalidate = 50


export default async function CardData() {

  const { data: obat_terakhir }: any = await supabse.from('obat').select("*").order('created_at', { ascending: false }).range(0, 0)
  const { data: total_transaksi_masuk }: any = await supabse.from('transaksimasuk').select("nominal")
  const { data: total_transaksi_keluar }: any = await supabse.from('transaksikeluar').select("nominal")

  const { data: transaksi_masuk_terlama }: any = await supabse.from('transaksimasuk').select("*").order('created_at', { ascending: false }).range(0, 0)
  const { data: transaksi_masuk_terbaru }: any = await supabse.from('transaksimasuk').select("*").order('created_at', { ascending: true }).range(0, 0)

  const { data: transaksi_keluar_terlama }: any = await supabse.from('transaksikeluar').select("*").order('created_at', { ascending: false }).range(0,0)
  const { data: transaksi_keluar_terbaru }: any = await supabse.from('transaksikeluar').select("*").order('created_at', { ascending: true }).range(0,0)

  const pengeluaran = total_transaksi_masuk.reduce((acc: number, curr: Transaksi) => acc + curr.nominal, 0)
  const pemasukan = total_transaksi_keluar.reduce((acc: number, curr: Transaksi) => acc + curr.nominal, 0)

//   console.log("obat_terakhir:", obat_terakhir);
// console.log("total_transaksi_masuk:", total_transaksi_masuk[0].sum); // Access sum from first element
// console.log("total_transaksi_keluar:", total_transaksi_keluar[0].sum); // Access sum from first element
// console.log("transaksi_masuk_terlama:", transaksi_masuk_terlama);
// console.log("transaksi_masuk_terbaru:", transaksi_masuk_terbaru);
// console.log("transaksi_keluar_terlama:", transaksi_keluar_terlama);
// console.log("transaksi_keluar_terbaru:", transaksi_keluar_terbaru);

  const diff = (target: string) => {

    // Mendapatkan selisih waktu dalam format jarak waktu dari sekarang
    const jarakWaktu = formatDistanceToNow(addHours(parseISO(target), 7), { locale: localeId });

    // Format waktu diberikan menjadi jam:menit
    const waktuDiberikanFormatted = format(addHours(parseISO(target), 7), "HH:mm", { locale: localeId });

    // Mencetak pesan dengan format yang diinginkan
    const result = `${waktuDiberikanFormatted}, ${jarakWaktu} yang lalu`

    return result
  }

  const currency = (number: number) => {
    return new Intl.NumberFormat('id-ID', { currency: 'IDR', style: 'currency', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(number)
  }

  return (
    <>
      {/* Card 1 - Latest Medicine */}
      <div className="bg-white rounded-lg shadow-md p-5 gap-3 max-w-xs flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Obat Terakhir Ditambah</h3>
          <div className="scale-150">
            <FcLike />
          </div>
        </div>
        <p className="text-2xl font-bold text-emerald-500 rounded w-fit p-1">{obat_terakhir[0]?.nama}</p>
        <p className="text-sm italic text-zinc-500 text-center">Ditambah: {
          diff(obat_terakhir[0]?.created_at)
        }</p>
        {/* Add more details as needed */}
      </div>

      {/* Card 2 - Total Incoming Transactions */}
      <div className="bg-white rounded-lg shadow-md p-5 gap-3 max-w-xs flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Total Pendapatan Bersih</h3>
          <div className="scale-150">
            <FcSalesPerformance />
          </div>
        </div>
        <p className={`text-2xl font-bold flex items-center ${pemasukan > pengeluaran ? 'text-emerald-500' : 'text-red-500'}`}>
          {(pemasukan > pengeluaran ? "+" : "-")}
          {currency(pemasukan - pengeluaran)}
        </p>
        <div className="flex justify-around text-zinc-500">
          <div className="flex flex-col text-sm">
            <p>Pemasukan</p>
            <p>{currency(pemasukan)}</p>
          </div>
          <Separator size={"4"} orientation="vertical" />
          <div className="flex flex-col text-sm">
            <p>Pengeluaran</p>
            <p>{currency(pengeluaran)}</p>
          </div>
        </div>
        {/* Add more details as needed */}
      </div>

      {/* Card 3 - Total Incoming Transactions */}
      <div className="bg-white rounded-lg shadow-md p-5 gap-3 max-w-xs flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Total Transaksi</h3>
          <div className="scale-150">
            <FcSynchronize />
          </div>
        </div>
        <p className={`text-2xl font-bold flex items-center ${pemasukan > pengeluaran ? 'text-emerald-500' : 'text-red-500'}`}>
          {total_transaksi_masuk.length + total_transaksi_keluar.length}x
        </p>
        <div className="flex justify-around text-center text-zinc-500">
          <div className="flex flex-col text-sm">
            <p>Masuk</p>
            <p>{total_transaksi_masuk.length}</p>
          </div>
          <Separator size={"4"} orientation="vertical" />
          <div className="flex flex-col text-sm">
            <p>Pengeluaran</p>
            <p>{total_transaksi_keluar.length}</p>
          </div>
        </div>
        {/* Add more details as needed */}
      </div>

      {/* Card 4 - Latest Incoming Transaction */}
      <div className="bg-white rounded-lg shadow-md p-5 gap-3 min-w-[300px] flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Transaksi Masuk Terlama</h3>
          <div className="scale-150">
            <FcImport />
          </div>
        </div>
        <p className="text-xl font-bold text-emerald-500 rounded w-fit p-1">{transaksi_masuk_terbaru[0]?.namaObat} | {currency(transaksi_masuk_terbaru[0]?.nominal)}</p>
        <p className="text-sm italic text-zinc-500 text-center">Ditambah: {diff(transaksi_masuk_terbaru[0]?.created_at)}</p>
        {/* Add more details as needed */}
      </div>

      <div className="bg-white rounded-lg shadow-md p-5 gap-3 min-w-[300px] flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Transaksi Masuk Terbaru</h3>
          <div className="scale-150">
            <FcImport />
          </div>
        </div>
        <p className="text-xl font-bold text-emerald-500 rounded w-fit p-1">{transaksi_masuk_terlama[0]?.namaObat} | {currency(transaksi_masuk_terlama[0]?.nominal)}</p>
        <p className="text-sm italic text-zinc-500 text-center">Ditambah: {diff(transaksi_masuk_terlama[0]?.created_at)}</p>
        {/* Add more details as needed */}
      </div>

      {/* Card 5 - Latest Outgoing Transaction */}
      <div className="bg-white rounded-lg shadow-md p-5 gap-3 min-w-[300px] flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Transaksi Keluar Terlama</h3>
          <div className="scale-150">
            <FcExport />
          </div>
        </div>
        <p className="text-xl font-bold text-emerald-500 rounded w-fit p-1">{transaksi_keluar_terbaru[0]?.namaObat} | {currency(transaksi_keluar_terbaru[0]?.nominal)}</p>
        <p className="text-sm italic text-zinc-500 text-center">Ditambah: {diff(transaksi_keluar_terbaru[0]?.created_at)}</p>
        {/* Add more details as needed */}
      </div>

      <div className="bg-white rounded-lg shadow-md p-5 gap-3 min-w-[300px] flex flex-col col-start-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">Transaksi Keluar Terbaru</h3>
          <div className="scale-150">
            <FcExport />
          </div>
        </div>
        <p className="text-xl font-bold text-emerald-500 rounded w-fit p-1">{transaksi_keluar_terlama[0]?.namaObat} | {currency(transaksi_keluar_terlama[0]?.nominal)}</p>
        <p className="text-sm italic text-zinc-500 text-center">Ditambah: {diff(transaksi_keluar_terlama[0]?.created_at)}</p>
        {/* Add more details as needed */}
      </div>
    </>
  )
}
