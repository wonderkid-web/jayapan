"use client"
import { Button, Table, TextField } from '@radix-ui/themes';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import {  memo, useMemo, useRef, useState } from 'react'
import { FcDataSheet } from "react-icons/fc";
import { useDownloadExcel } from 'react-export-table-to-excel';
import { FcNext,FcPrevious } from "react-icons/fc";
import uuid from 'react-uuid';


type Transaksi = {
    id: string | null;
    obatId: string | null;
    jumlah: number | null;
    nominal: number | null;
    created_at: string;
}


const TableLaporan = ({ datas, columns }: { datas: Transaksi[], columns: any }) => {
    const [filter, setFilter] = useState<string>('')
    const [sorting, setSorting] = useState<any>([])
    const tableRef = useRef(null)
    const data = useMemo(() => datas, [datas])

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter: filter,
            sorting: sorting
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setFilter,

    })

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })

    if (data && table) {
        return (
            <div className='mx-auto'>
                <div className='flex gap-2 flex-col'>
                    <TextField.Input placeholder='Cari Obat...' onChange={(e: any) => setFilter(e.currentTarget.value)} />
                    <Button className='w-fit self-end' onClick={onDownload}>
                        <span className='rounded bg-white'>
                            <FcDataSheet />
                        </span>
                        Cetak
                    </Button>
                </div>
                <Table.Root ref={tableRef}>
                    <Table.Header>
                        {
                            table?.getHeaderGroups()?.map(headerGroup => <Table.Row key={uuid()}>
                                {headerGroup.headers.map((header: any) => <Table.ColumnHeaderCell key={uuid()}>{header.column.columnDef.header}</Table.ColumnHeaderCell>)}
                            </Table.Row>)
                        }
                    </Table.Header>
                    <Table.Body>
                        {
                            table?.getRowModel()?.rows?.map(row => <Table.Row key={uuid()}>
                                {
                                    row.getVisibleCells().map(cell => <Table.Cell key={uuid()}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Table.Cell>
                                    )
                                }
                            </Table.Row>)
                        }
                    </Table.Body>
                </Table.Root>
                <div className='flex justify-center gap-x-3 mt-2'>
                    <Button onClick={() => table.setPageIndex(0)}>Halaman Pertama</Button>
                    <Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}> <FcPrevious /> </Button>
                    <Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}><FcNext /></Button>
                    <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)}> Halaman Terakhir</Button>
                </div>
            </div>
        )
    }
}

export default memo(TableLaporan)