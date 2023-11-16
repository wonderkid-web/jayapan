import { Table } from '@radix-ui/themes'
import React from 'react'

const TableBody = () => {
    return (
        <Table.Body>
            {
                data?.map((d: Obat) => (
                    <Table.Row>
                        <Table.RowHeaderCell justify={'center'}>{d.nama}</Table.RowHeaderCell>
                        <Table.Cell justify={'center'}>{d.jenis}</Table.Cell>
                        <Table.Cell justify={'center'}>{d.harga}</Table.Cell>
                        <Table.Cell justify={'center'}>{d.stock}</Table.Cell>
                        <Table.Cell justify={'center'}>{d.created_at}</Table.Cell>
                    </Table.Row>
                ))
            }
        </Table.Body>
    )
}

export default TableBody