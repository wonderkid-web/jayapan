import CardData from "../components/master_data/CardData";

type Obat = {
  id: string;
  nama: string;
  jenis: string;
  harga: number;
  stock: number;
  created_at: string;
}

export const revalidate = 0

export default async function Dashboard() {

  return (
    <div className="grid xl:grid-cols-3 xl:grid-rows-4 sm:grid-cols-1 gap-4"> 
      <CardData />
    </div>
  )
}
