import supabse from "@/utils/supabse"

export default async function Dashboard() {

  const supa = await supabse.from('obat').select()
  const {data} = await supabse.from('obat').select()

  return (
    <div>
      {data && 
        <pre>{JSON.stringify(data, null, 2)}</pre>
      }

      <br />


    </div>
  )
}
