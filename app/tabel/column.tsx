'use client'
import { Button } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";

interface Obat {
    id: string;
    nama: string;
    jenis: string;
    harga: number;
    stock: number;
    created_at: string;
}

export const columns: ColumnDef<Obat>[] = [
    {
        header: "ID",
        accessorKey: 'id'
    },
    {
        header: "Nama Obat",
        accessorKey: 'nama'
    },
    {
        header: "Jenis",
        accessorKey: 'jenis'
    },
    {
        header: "Harga",
        accessorKey: 'harga'
    },
    {
        header: "Nama Obat",
        accessorKey: 'nama'
    },
    {
        header: "Waktu ditambah",
        accessorKey: 'created_at'
    },
    {
        header: "Option",
        cell: ({row}) => {
            return (
                <Button onClick={()=>alert(JSON.stringify(row,null,2))}>
                    klik
                </Button>
            )
        }
    }

]