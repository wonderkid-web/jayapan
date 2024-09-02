import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


type Obat = {
  id: string;
  nama: string;
  jenis: string;
  harga: number;
  stock: number;
  created_at: string;
};

type ReceiptProps = {
  orders: Obat[];
  onClose: () => void;
  handleTransaksiKeluar: any
};

export default function Receipt({ orders, onClose, handleTransaksiKeluar }: ReceiptProps) {
  const total = orders.reduce((sum, order) => sum + order.harga * order.stock, 0);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Struk Belanja</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.nama}</TableCell>
                <TableCell>{order.stock}</TableCell>
                <TableCell>Rp {order.harga.toLocaleString()}</TableCell>
                <TableCell>Rp {(order.harga * order.stock).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right">
          <p className="font-bold">Total: Rp {total.toLocaleString()}</p>
        </div>
        <button
              className="bg-green-500 text-white w-full p-2 rounded mt-4"
              onClick={handleTransaksiKeluar}
            >
              Bayar
            </button>
        <button
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
          onClick={onClose}
        >
          Tutup
        </button>
      </CardContent>
    </Card>
  );
}