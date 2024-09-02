"use client";

// pages/index.js

import React, { useEffect, useState } from "react";
import supabse from "@/utils/supabse";
import { Callout, TextField } from "@radix-ui/themes";
import Image from "next/image";
import drug from "/public/drugs.png";
import uuid from "react-uuid";
import { toast } from "sonner";
import { FcApproval, FcDisclaimer } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import Receipt from "@/app/components/laporan/Receipt";

type Obat = {
  id: string;
  nama: string;
  jenis: string;
  harga: number;
  stock: number;
  created_at: string;
};

function ProductCard({ image, name, price, onClick, stock }: any) {
  return (
    <div
      className="border rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={drug}
        alt={name}
        className="w-full h-32 sm:h-48 object-cover"
      />

      <div className="p-4 flex flex-col relative">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-gray-600">Rp {price.toLocaleString()}</p>
        <p className="text-white rounded-md px-2 py-1 self-end top-5 absolute bg-green-700">
          STOCK: {stock}
        </p>
      </div>
    </div>
  );
}

function OrderItem({ name, quantity, price, onRemove }: any) {
  return (
    <div className="flex justify-between items-center mb-2">
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">x{quantity}</p>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 mr-4">Rp {price.toLocaleString()}</span>
        <button onClick={onRemove} className="text-red-600">
          X
        </button>
      </div>
    </div>
  );
}

export default function Kasir() {
  const [products, setProducts] = useState<Obat[]>([]);
  const [orders, setOrders] = useState<Obat[]>([]);
  const [showReceipt, setShowReceipt] = useState(false);

  const getData = async () => {
    const { data }: any = await supabse.from("obat").select("*");
    console.log(data);
    return data;
  };

  useEffect(() => {
    getData().then((data) => {
      setProducts(data);
    });
  }, []);

  const handleSearch = (e: any) => {
    if (e.currentTarget.value) {
      const filteredProducts = products.filter((obat: Obat) =>
        obat.nama.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      getData().then((data) => {
        setProducts(data);
      });
    }
  };

  const addToOrder = (product: Obat) => {
    const existingOrder = orders.find((order) => order.id === product.id);
    if (existingOrder) {
      setOrders(
        orders.map((order) =>
          order.id === product.id ? { ...order, stock: order.stock + 1 } : order
        )
      );
    } else {
      setOrders([...orders, { ...product, stock: 1 }]);
    }
  };

  const removeFromOrder = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleTransaksiKeluar = async () => {
    for (const obat of orders) {
      // @ts-ignore
      const { stock: oldStock } = products.find(
        (product) => product.id == obat.id
      );

      const newStock = Number(oldStock) - obat.stock;

      if (newStock < 0) {
        toast(
          <Callout.Root>
            <Callout.Icon>
              <FcDisclaimer />
            </Callout.Icon>
            <Callout.Text>Stok tidak mencukupi untuk {obat.nama}.</Callout.Text>
          </Callout.Root>,
          { duration: 2000 }
        );
        return;
      }

      const { data, error } = await supabse
        .from("obat")
        .update({ stock: newStock })
        .eq("id", obat.id)
        .select();

      if (data) {
        const { status } = await supabse.from("transaksikeluar").insert({
          id: uuid(),
          obatId: obat.id,
          namaObat: obat.nama,
          jumlah: obat.stock,
          nominal: Number(obat.stock) * Number(obat.harga),
        });

        if (status == 201) {
          toast(
            <Callout.Root
              style={{ display: "flex", alignItems: "center", columnGap: 8 }}
            >
              <Callout.Icon>
                <FcApproval />
              </Callout.Icon>
              <Callout.Text>
                Kamu berhasil menambahkan transaksi keluar baru.
              </Callout.Text>
            </Callout.Root>,
            { duration: 2000 }
          );
        }
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
    }


    // Refresh data
    getData().then((data) => {
      setProducts(data);
      setOrders([]);
    });

    setShowReceipt(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl mb-3">Fungsionalitas Data Obat</h1>
      <TextField.Input placeholder="Cari Obat..." onChange={handleSearch} />
      <div className="flex mt-4">
        <div className="w-3/4 pr-4">
          <div className="grid grid-cols-3 gap-4">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                image="/path/to/default-image.jpg" // Ganti dengan URL gambar produk sebenarnya
                name={product.nama}
                price={product.harga}
                stock={product.stock}
                onClick={() => addToOrder(product)}
              />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <h2 className="font-bold text-lg mb-4">Daftar Pesanan</h2>
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              name={order.nama}
              quantity={order.stock}
              price={order.harga * order.stock}
              onRemove={() => removeFromOrder(order.id)}
            />
          ))}
          <div className="mt-4">
            <h3 className="font-bold text-xl">
              Total: Rp{" "}
              {orders
                .reduce((total, order) => total + order.harga * order.stock, 0)
                .toLocaleString()}
            </h3>
            <button
              className="bg-green-500 ml-4 text-white p-2 rounded mt-2"
              onClick={() => setShowReceipt((prev) => !prev)}
            >
              Lihat Struk
            </button>
          </div>
        </div>
      </div>
      {showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Receipt
            handleTransaksiKeluar={handleTransaksiKeluar}
            orders={orders}
            onClose={() => {
              setShowReceipt(false);
              setOrders([]); // Clear the orders after closing the receipt
            }}
          />
        </div>
      )}
    </div>
  );
}
