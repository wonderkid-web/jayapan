import AuthTemplate from "../../components/auth/AuthTemplate";
import InputUser from "../../components/user/InputUser";

export default function user() {
  return (
    <div className='flex flex-col mx-auto gap-y-2 border p-4 w-[400px] h-fit rounded-md'>
      <AuthTemplate />
      <h1 className='self-center'>Tambah Pengguna</h1>
      <InputUser />
    </div>
  )
}
