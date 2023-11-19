import AuthTemplate from '@/app/components/auth/AuthTemplate'
import InputObat from '@/app/components/master_data/InputObat'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

export default function TambahObat() {
 
  return (
    <div className='flex flex-col gap-y-2 border p-4 rounded-md relative top-[-160px]'>
      <AuthTemplate />
      <h1 className='self-center'>Tambah Obat</h1>
      <Button>
        <Link href={'/dashboard'}>Go to Dashboard!</Link>
      </Button>
      <InputObat />
    </div>

  )
}
