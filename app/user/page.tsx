"use client"
import supabse from '@/utils/supabse'
import { addHours, format, parseISO } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { FcDisapprove, FcFullTrash, FcLike } from 'react-icons/fc'
import idLocale from 'date-fns/locale/id'
import Image from 'next/image'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'

type User = {
    id: string;
    username: string;
    password: string;
    created_at: string;
}

export default function Page() {
    const [user, setUser] = useState<User[]>([])

    useEffect(() => {
        getAllUser()
    })

    const getAllUser = async () => {
        try {
            const { data }: any = await supabse.from('akun').select('*')
            setUser(data)
        } catch (e: any) {
            console.log('gagal get All User', e.message)
        }
    }

    const formatTime = (time: string) => {
        return format(new Date(time), "dd-MM-yyyy HH:mm", { locale: idLocale })
    }


    const handleDelete = async (id: string) => {
            const {error} = await supabse.from('akun').delete().eq('id', id).select()
            if(error){
                alert('akun gagal di hapus')
            }else{
                alert('akun berhasil di hapus')
            }
    }

    return (
        <div className="grid xl:grid-cols-3 xl:grid-rows-4 sm:grid-cols-1 gap-4">
            {
                user && user.map((u: User) => (
                    <div className="bg-white min-w-[250px] rounded-lg shadow-md p-5 gap-3 max-w-xs flex flex-col">
                        <div className="flex justify-around items-center">
                            <Image className='rounded rounded-md' src={`https://dosen.unimma.ac.id/public/foto/anonym.jpg`} width={50} height={50} alt='anonym' />
                            <div className="scale-150">
                                <h3 className="text-lg">{u.username}</h3>
                                <AlertDialog.Root>
                                    <AlertDialog.Trigger>
                                        <Button size={'1'} color="red">hapus</Button>
                                    </AlertDialog.Trigger>
                                    <AlertDialog.Content style={{ maxWidth: 450 }}>
                                        <AlertDialog.Title>Hapus akun ini</AlertDialog.Title>
                                        <AlertDialog.Description size="2">
                                           {`Apakah kamu yakin ingin mengahpus akun ${u.username}.?`}
                                        </AlertDialog.Description>

                                        <Flex gap="3" mt="4" justify="end">
                                            <AlertDialog.Cancel>
                                                <Button variant="soft" color="gray">
                                                    batal
                                                </Button>
                                            </AlertDialog.Cancel>
                                            <AlertDialog.Action>
                                                <Button onClick={()=>handleDelete(u.id)} variant="solid" color="red">
                                                    hapus
                                                </Button>
                                            </AlertDialog.Action>
                                        </Flex>
                                    </AlertDialog.Content>
                                </AlertDialog.Root>
                            </div>
                        </div>
                        <p className="text-sm italic text-zinc-500 text-center">Ditambah:{formatTime(u.created_at)}</p>
                    </div>
                ))
            }
        </div>
    )
}
