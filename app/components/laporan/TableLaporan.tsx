"use client"
import { Button, Table } from '@radix-ui/themes';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo, useRef } from 'react'
import { DownloadTableExcel } from 'react-export-table-to-excel';


type Transaksi = {
    id: string | null;
    obatId: string | null;
    jumlah: number | null;
    nominal: number | null;
    created_at: string;
}


const TableLaporan = ({ datas, columns }: { datas: Transaksi[], columns: any }) => {
    const tableRef = useRef(null)

    const data = useMemo(() => datas, [datas])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (data) {
        return (
            <div>
                <DownloadTableExcel
                    filename={`table-${new Date()}`}
                    sheet='table-transaksi'
                    currentTableRef={tableRef.current}
                >
                    <Button>Download Excel</Button>
                </DownloadTableExcel>
                <Table.Root ref={tableRef}>
                    <Table.Header>
                        {
                            table.getHeaderGroups().map(headerGroup => <Table.Row key={headerGroup.id}>
                                {headerGroup.headers.map((header: any) => <Table.ColumnHeaderCell key={headerGroup.id}>{header.column.columnDef.header}</Table.ColumnHeaderCell>)}
                            </Table.Row>)
                        }
                    </Table.Header>
                    <Table.Body>
                        {
                            table.getRowModel().rows.map(row => <Table.Row key={row.id}>
                                {
                                    row.getVisibleCells().map(cell => <Table.Cell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Table.Cell>
                                    )
                                }
                            </Table.Row>)
                        }
                    </Table.Body>
                </Table.Root>
            </div>
        )
    }
}

export default TableLaporan