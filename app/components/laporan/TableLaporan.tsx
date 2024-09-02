"use client"
import { Button, Table, TextField, Select } from '@radix-ui/themes';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { memo, useMemo, useRef, useState } from 'react'
import { FcDataSheet } from "react-icons/fc";
import { useDownloadExcel } from 'react-export-table-to-excel';
import { FcNext, FcPrevious } from "react-icons/fc";
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
    const [monthFilter, setMonthFilter] = useState<string>('')
    const [yearFilter, setYearFilter] = useState<string>('')
    const [sorting, setSorting] = useState<any>([])
    const tableRef = useRef(null)
    const data = useMemo(() => datas, [datas])

    const filteredData = useMemo(() => {  
        return data?.filter((item) => {
            const date = new Date(item.created_at);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString();
            
            return (
                (monthFilter === '' || month === monthFilter) &&
                (yearFilter === '' || year === yearFilter) && 
                (filter === '' || 
                 columns.some((col: any) => 
                    // @ts-ignore
                    String(item[col.accessorKey])
                        .toLowerCase()
                        .includes(filter.toLowerCase())
                 )
                )
            );
        });
    }, [data, filter, monthFilter, yearFilter, columns]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            sorting: sorting
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
    })

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear; i >= currentYear - 10; i--) {
            years.push(i.toString());
        }
        return years;
    }

    if (data && table) {
        return (
            <div className='mx-auto'>
                <div className='flex gap-2 flex-col'>
                    <div className='flex gap-2'>
                        <TextField.Input 
                            placeholder='Cari Obat...' 
                            onChange={(e: any) => setFilter(e.currentTarget.value)} 
                        />
                        <Select.Root value={monthFilter} onValueChange={setMonthFilter}>
                            <Select.Trigger placeholder="Pilih Bulan" />
                            <Select.Content>
                                <Select.Item value="-">Semua Bulan</Select.Item>
                                {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((month) => (
                                    <Select.Item key={month} value={month}>
                                        {new Date(2000, parseInt(month) - 1, 1).toLocaleString('default', { month: 'long' })}
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Root>
                        <Select.Root value={yearFilter} onValueChange={setYearFilter}>
                            <Select.Trigger placeholder="Pilih Tahun" />
                            <Select.Content>
                                <Select.Item value="-">Semua Tahun</Select.Item>
                                {generateYearOptions().map((year) => (
                                    <Select.Item key={year} value={year}>{year}</Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Root>
                    </div>
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