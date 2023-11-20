"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import uuid from 'react-uuid';


type Route = {
    path: string;
    label: string;
}

const Sidebar = () => {

    const path = usePathname()

    let routes : Route[] = []

    if (path !== '/login' && path !== '/obat') {
        routes = [
            { path: '/', label: 'Home' },
            { path: '/dashboard', label: 'Dashboard' },
            { path: '/laporan/keluar', label: 'Laporan Keluar' },
            { path: '/laporan/masuk', label: 'Laporan Masuk' },
            { path: '/master_data/tabel', label: 'Tabel Obat' },
            { path: '/master_data/tambah', label: 'Tambah Obat' },
            { path: '/master_data/update', label: 'Update Harga Obat' },
            { path: '/transaksi/keluar', label: 'Transaksi Keluar' },
            { path: '/transaksi/masuk', label: 'Transaksi Masuk' },
        ];
    }

    return (
        <>
            {
                routes.map((route) => <Link className={`${path === route.path && `bg-white text-emerald-500 p-1 rounded transition-1`}`} key={uuid()} href={route?.path}>{route?.label}</Link>)
            }
        </>
    )
}

export default Sidebar