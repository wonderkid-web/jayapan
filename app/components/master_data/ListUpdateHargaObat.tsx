"use client";
import supabse from "@/utils/supabse";
import React, { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import { Button, Callout, Dialog, Flex, TextField } from "@radix-ui/themes";
import { toast } from "sonner";
import { FcApproval, FcDisclaimer } from "react-icons/fc";

type Obat = {
  id: string;
  nama: string;
  jenis: string;
  harga: number | string;
  stock: number;
  created_at: string;
};

export const revalidate = 0;

export const ListUpdateHargaObat = () => {
  const [obat, setObat] = useState<Obat[]>([]);

  const form = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData: () => void = async () => {
    const { data }: any = await supabse.from("obat").select("*");
    setObat(data);
  };

  const handleUpdateHarga = async (e: any, id: string) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const harga = Object.fromEntries(formData);
    const { data, error } = await supabse
      .from("obat")
      .update(harga)
      .eq("id", id)
      .select();
    if (data) {
      getData();
      toast(
        <Callout.Root
          style={{ display: "flex", alignItems: "center", columnGap: 8 }}
        >
          <Callout.Icon>
            <FcApproval />
          </Callout.Icon>
          <Callout.Text>Kamu berhasil menambahkan obat baru.</Callout.Text>
        </Callout.Root>,
        { duration: 2000 }
      );
    } else {
      toast(
        <Callout.Root
          style={{ display: "flex", alignItems: "center", columnGap: 8 }}
        >
          <Callout.Icon>
            <FcDisclaimer />
          </Callout.Icon>
          <Callout.Text>Username atau Password kamu Salah!</Callout.Text>
        </Callout.Root>,
        { duration: 2000 }
      );
    }
  };

  const handleTransaksiMasuk = async (e: any, obat:Obat) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {stock} = Object.fromEntries(formData);

      // Validate stock input
      if (isNaN(Number(stock)) || Number(stock) < 0) {
        toast(
            <Callout.Root>
                <Callout.Icon>
                    <FcDisclaimer />
                </Callout.Icon>
                <Callout.Text>Invalid stock value. Please enter a positive number.</Callout.Text>
            </Callout.Root>,
            { duration: 2000 }
        );
        return; // Prevent form submission if validation fails
    }

    const newStock = Number(obat.stock) + Number(stock);
    // Rest of your update logic using newStock

    const { data, error } = await supabse
      .from("obat")
      .update({stock: newStock})
      .eq("id", obat.id)
      .select();
    if (data) {
      const {status} = await supabse.from("transaksimasuk").insert({
        id: uuid(),
        obatId: obat.id,
        namaObat: obat.nama,
        jumlah: stock,
        nominal: Number(stock) * Number(obat.harga)
      })

      if(status == 201){
        getData();
        toast(
          <Callout.Root
            style={{ display: "flex", alignItems: "center", columnGap: 8 }}
          >
            <Callout.Icon>
              <FcApproval />
            </Callout.Icon>
            <Callout.Text>Kamu berhasil menambahkan transaksi masuk baru.</Callout.Text>
          </Callout.Root>,
          { duration: 2000 }
        );
      }

      console.log(error)
    } else {
      toast(
        <Callout.Root
          style={{ display: "flex", alignItems: "center", columnGap: 8 }}
        >
          <Callout.Icon>
            <FcDisclaimer />
          </Callout.Icon>
          <Callout.Text>Gagal membuat transaksi!</Callout.Text>
        </Callout.Root>,
        { duration: 2000 }
      );
    }
  };


  const handleTransaksiKeluar = async (e: any, obat:Obat) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {stock} = Object.fromEntries(formData);

      // Validate stock input
      if (isNaN(Number(stock)) || Number(stock) < 0) {
        toast(
            <Callout.Root>
                <Callout.Icon>
                    <FcDisclaimer />
                </Callout.Icon>
                <Callout.Text>Invalid stock value. Please enter a positive number.</Callout.Text>
            </Callout.Root>,
            { duration: 2000 }
        );
        return; // Prevent form submission if validation fails
    }

    const newStock = Number(obat.stock) - Number(stock);
    // Rest of your update logic using newStock

    const { data, error } = await supabse
      .from("obat")
      .update({stock: newStock})
      .eq("id", obat.id)
      .select();
    if (data) {
      const {status} = await supabse.from("transaksikeluar").insert({
        id: uuid(),
        obatId: obat.id,
        namaObat: obat.nama,
        jumlah: stock,
        nominal: Number(stock) * Number(obat.harga)
      })

      if(status == 201){
        getData();
        toast(
          <Callout.Root
            style={{ display: "flex", alignItems: "center", columnGap: 8 }}
          >
            <Callout.Icon>
              <FcApproval />
            </Callout.Icon>
            <Callout.Text>Kamu berhasil menambahkan transaksi keluar baru.</Callout.Text>
          </Callout.Root>,
          { duration: 2000 }
        );
      }

      console.log(error)
    } else {
      toast(
        <Callout.Root
          style={{ display: "flex", alignItems: "center", columnGap: 8 }}
        >
          <Callout.Icon>
            <FcDisclaimer />
          </Callout.Icon>
          <Callout.Text>Gagal membuat transaksi!</Callout.Text>
        </Callout.Root>,
        { duration: 2000 }
      );
    }
  };


  const currency = (harga: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(harga);
  };

  

  return (
    <div className="grid grid-cols-4 grid-rows-4 items-between gap-2">
      {obat &&
        obat?.map((d: Obat) => (
          <div
            key={uuid()}
            className="border border-gray-300 h-fit rounded-lg p-4 max-w-xs flex flex-col gap-1"
          >
            <h3 className="text-lg text-white bg-emerald-500 w-fit p-1 rounded font-bold mb-2">
              {d.nama}
            </h3>
            {/* <p className="self-end text-sm text-gray-500 italic">
                        {
                            format(addHours(new Date(d.created_at), 7), "dd-MM-yyyy HH:mm", { locale: localeId })
                        } </p> */}
            <p className="mb-2">
              <span className="font-bold">Harga:</span>
              {currency(d.harga)}
            </p>
            <p className="mb-2">
              <span className="font-bold">Jenis:</span> {d.jenis}
            </p>
            <p>
              <span className="font-bold">Stock:</span> {d.stock}
            </p>

            
            <Dialog.Root>
              <Dialog.Trigger>
                <Button color="jade" style={{ background: "rgb(16 185 129)" }}>
                  update
                </Button>
              </Dialog.Trigger>

              <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Edit Harga Obat</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                  Ubah harga obat kamu disini.
                </Dialog.Description>

                <form onSubmit={(e) => handleUpdateHarga(e, d.id)} ref={form}>
                  <Flex direction="column" gap="3">
                    <label>
                      <TextField.Input
                        name="harga"
                        type="number"
                        placeholder={currency(d.harga) as string}
                        min={0}
                      />
                    </label>
                    <div className="flex justify-end gap-2">
                      <Dialog.Close>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button
                          color="jade"
                          type="submit"
                          style={{ background: "rgb(16 185 129)" }}
                        >
                          Save
                        </Button>
                      </Dialog.Close>
                    </div>
                  </Flex>
                </form>
              </Dialog.Content>
            </Dialog.Root>

            <div className="flex gap-2">
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button
                    color="jade"
                    style={{ background: "rgb(16 185 129)" }}
                  >
                    masuk
                  </Button>
                </Dialog.Trigger>

                <Dialog.Content style={{ maxWidth: 450 }}>
                  <Dialog.Title>Transaksi Masuk</Dialog.Title>
                  <Dialog.Description size="2" mb="4">
                    Transaksi Obat Masuk kamu disini.
                  </Dialog.Description>

                  <form onSubmit={(e) => handleTransaksiMasuk(e, d)} ref={form}>
                    <Flex direction="column" gap="3">
                      <label>
                        <TextField.Input
                          name="stock"
                          type="number"
                          placeholder={`${d.stock}`}
                          min={0}
                        />
                      </label>
                      <div className="flex justify-end gap-2">
                        <Dialog.Close>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                          <Button
                            color="jade"
                            type="submit"
                            style={{ background: "rgb(16 185 129)" }}
                          >
                            Save
                          </Button>
                        </Dialog.Close>
                      </div>
                    </Flex>
                  </form>
                </Dialog.Content>
              </Dialog.Root>

              <Dialog.Root>
                <Dialog.Trigger>
                  <Button
                    color="jade"
                    style={{ background: "rgb(16 185 129)" }}
                  >
                    keluar
                  </Button>
                </Dialog.Trigger>

                <Dialog.Content style={{ maxWidth: 450 }}>
                  <Dialog.Title>Transaksi Obat Keluar</Dialog.Title>
                  <Dialog.Description size="2" mb="4">
                  Transaksi Obat Keluar kamu disini.
                  </Dialog.Description>

                  <form onSubmit={(e) => handleTransaksiKeluar(e, d)} ref={form}>
                    <Flex direction="column" gap="3">
                      <label>
                        <TextField.Input
                          name="stock"
                          type="number"
                          placeholder={`${d.stock}`}
                          min={0}
                        />
                      </label>
                      <div className="flex justify-end gap-2">
                        <Dialog.Close>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                          <Button
                            color="jade"
                            type="submit"
                            style={{ background: "rgb(16 185 129)" }}
                          >
                            Save
                          </Button>
                        </Dialog.Close>
                      </div>
                    </Flex>
                  </form>
                </Dialog.Content>
              </Dialog.Root>
            </div>
          </div>
        ))}
    </div>
  );
};
