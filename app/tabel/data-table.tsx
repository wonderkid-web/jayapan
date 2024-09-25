'use client'

import { Table, TextField } from "@radix-ui/themes"
import { useReactTable, getCoreRowModel, ColumnDef, flexRender, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table"
import { useState } from "react"

interface DataTableProps<Tdata, Tvalue> {
    columns: ColumnDef<Tdata, Tvalue>[],
    data: Tdata[]
}

export function ObatTable<Tdata, Tvalue>({
    columns, data
}: DataTableProps<Tdata, Tvalue>) {

    const [columnFilters, setColumnFilters] = useState<string>('')

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state:{
            globalFilter: columnFilters
        },
        onGlobalFilterChange: setColumnFilters
    })

    return (
        <Table.Root>
            <TextField.Input onChange={(e:any)=>table.getColumn("nama")?.setFilterValue(e.target.value)} />
            <Table.Header>
                {
                    table.getHeaderGroups().map(headerGroup => {
                        return (
                            <Table.Row key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => (
                                        <Table.ColumnHeaderCell key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Table.ColumnHeaderCell>
                                    ))
                                }
                            </Table.Row>
                        )
                    })
                }
            </Table.Header>

            <Table.Body>
                {
                    table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                            <Table.Row id={row.id} key={row.id}>
                                {
                                    row.getVisibleCells().map(cell=>(
                                        <Table.Cell key={cell.id}>
                                            {
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </Table.Cell>
                                    ))
                                }
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                            <Table.RowHeaderCell>Obat nya kosong</Table.RowHeaderCell>
                        </Table.Row>
                    )
                }
            </Table.Body>
        </Table.Root >
    )
}