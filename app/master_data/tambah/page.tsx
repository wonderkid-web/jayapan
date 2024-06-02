import AuthTemplate from '@/app/components/auth/AuthTemplate'
import InputObat from '@/app/components/master_data/InputObat'

export default function TambahObat() {
 
  return (
    <div className='flex flex-col mx-auto gap-y-2 border p-4 w-[400px] h-fit rounded-md'>
      <AuthTemplate />
      <h1 className='self-center'>Tambah Obat</h1>
      <InputObat />
    </div>

  )
}
