"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { FcConferenceCall, FcDocument, FcRefresh, FcStatistics, FcViewDetails } from 'react-icons/fc';
import uuid from 'react-uuid';

type List = {
    path: string;
    label: string;
}

type Route = {
    title: string;
    icon: React.ComponentElement<any, any>;
    list: List[]
}

const Sidebar = () => {

    const path = usePathname()

    let routes: Route[] = []

    if (path !== '/login' && path !== '/obat') {
        routes = [
            {
                title: "Home",
                icon: <FcStatistics />,
                list: [
                    { path: '/dashboard', label: 'Dashboard' },
                ]
            },
            {
                title: "Master Data Obat",
                icon: <FcViewDetails />,
                list: [
                    { path: '/master_data/tabel', label: 'Tabel' },
                    { path: '/master_data/tambah', label: 'Tambah' },
                    { path: '/master_data/update', label: 'Fungsionalitas' },
                ]
            },
            // {
            //     title: "Transaksi",
            //     icon: <FcRefresh />,
            //     list: [
            //         { path: '/transaksi/keluar', label: 'Transaksi Keluar' },
            //         { path: '/transaksi/masuk', label: 'Transaksi Masuk' },
            //     ]
            // },
            {
                title: "Laporan",
                icon: <FcDocument />,
                list: [
                    { path: '/laporan/keluar', label: 'Laporan Keluar' },
                    { path: '/laporan/masuk', label: 'Laporan Masuk' },
                ]
            },
            {
                title: "Pengguna",
                icon: <FcConferenceCall />,
                list: [
                    { path: '/user', label: 'Akun Pengguna' },
                    { path: '/user/tambah', label: 'Tambah Pengguna' },
                ]
            },
        ];
    }

    return (
        <>
            <ul>
                {
                    routes.map((route, index) => (
                        <li key={index}>
                            <div className='font-bold flex items-center my-1'>
                                <span className='relative -left-2'>
                                    {route.icon}
                                </span>
                                {route.title}
                            </div>
                            <ul className='ml-4 overflow-hidden rounded-md text-sm'>
                                {route.list.map((l, i) =>
                                    <li className='p-1 my-1 truncate' key={i}>
                                        <Link className={`${path === l.path && `bg-white text-emerald-500 p-1 font-bold rounded transition-1`} `} key={uuid()} href={l?.path}>
                                            {l?.label}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default Sidebar