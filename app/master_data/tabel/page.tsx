import supabse from '@/utils/supabse'
import { Table } from '@radix-ui/themes'
import { format } from 'path';
import idLocale from 'date-fns/locale/id';
import React from 'react'

type Obat = {
  id:string;
  nama: string;
  jenis: string;
  harga: number;
  stock: number;
  created_at: string;
}

export default async function TabelOBat() {

  const { data } = await supabse.from('obat').select()



  return (
    <div>
      <Table.Root>
        <Table.Header>
          <Table.Row align={'center'}>
            <Table.ColumnHeaderCell justify={'center'}>Nama Obat</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={'center'}>Jenis</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={'center'}>Harga</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={'center'}>Stock</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={'center'}>Ditambah</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            data?.map((d: Obat) => (
              <Table.Row key={d.id}>
                <Table.RowHeaderCell justify={'center'}>{d.nama}</Table.RowHeaderCell>
                <Table.Cell justify={'center'}>{d.jenis}</Table.Cell>
                <Table.Cell justify={'center'}>{d.harga}</Table.Cell>
                <Table.Cell justify={'center'}>{d.stock}</Table.Cell>
                <Table.Cell justify={'center'}>{d.created_at}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>
    </div>
  )
}
