import supabse from "@/utils/supabse"
import AuthTemplate from "../components/auth/AuthTemplate"

export default async function Dashboard() {

  const { data } = await supabse.from('obat').select()

  return (
    <div>

      <AuthTemplate />

      {data &&
        <pre>{JSON.stringify(data, null, 2)}</pre>
      }
    </div>
  )
}
