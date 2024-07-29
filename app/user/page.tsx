"use client";
import supabse from "@/utils/supabse";
import { addHours, format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  FcApproval,
  FcDisapprove,
  FcDisclaimer,
  FcFullTrash,
  FcLike,
} from "react-icons/fc";
import idLocale from "date-fns/locale/id";
import Image from "next/image";
import { AlertDialog, Button, Callout, Flex } from "@radix-ui/themes";
import { toast } from "sonner";
import pengguna from "@/public/pengguna.jpg";

type User = {
  id: string;
  username: string;
  password: string;
  created_at: string;
};

export default function Page() {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    try {
      const { data }: any = await supabse.from("akun").select("*");
      setUser(data);
    } catch (e: any) {
      console.log("gagal get All User", e.message);
    }
  };

  const formatTime = (time: string) => {
    return format(new Date(time), "dd-MM-yyyy HH:mm", { locale: idLocale });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabse.from("akun").delete().eq("id", id).select();
    if (error) {
      toast(
        <Callout.Root
          style={{ display: "flex", alignItems: "center", columnGap: 8 }}
        >
          <Callout.Icon>
            <FcDisclaimer />
          </Callout.Icon>
          <Callout.Text>Akun gagal terhapus.</Callout.Text>
        </Callout.Root>,
        { duration: 2000 }
      );
    } else {
      toast(
        <Callout.Root
          style={{ display: "flex", alignItems: "center", columnGap: 8 }}
        >
          <Callout.Icon>
            <FcApproval />
          </Callout.Icon>
          <Callout.Text>Akun terhapus.</Callout.Text>
        </Callout.Root>,
        { duration: 2000 }
      );
      getAllUser();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-2xl">Akun Pengguna</h1>

      <div className="grid xl:grid-cols-3 xl:grid-rows-4 sm:grid-cols-1 gap-4">
        {user &&
          user.map((u: User) => (
            <div
              key={u.id}
              className="bg-white min-w-[250px] rounded-lg shadow-md p-5 gap-3 max-w-xs flex flex-col"
            >
              <div className="flex justify-around items-center">
                <Image
                  className="rounded-md"
                  src={pengguna}
                  width={50}
                  height={50}
                  alt="anonym"
                />
                <div className="scale-150">
                  <h3 className="text-lg">{u.username}</h3>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger>
                      <Button
                        size={"1"}
                        color="red"
                        style={{ background: "#e5484d" }}
                      >
                        hapus
                      </Button>
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
                          <Button
                            variant="solid"
                            color="red"
                            onClick={() => handleDelete(u.id)}
                            style={{ background: "#e5484d" }}
                          >
                            hapus
                          </Button>
                        </AlertDialog.Action>
                      </Flex>
                    </AlertDialog.Content>
                  </AlertDialog.Root>
                </div>
              </div>
              <p className="text-sm italic text-zinc-500 text-center">
                Ditambah:{formatTime(u.created_at)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
