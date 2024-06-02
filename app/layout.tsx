"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { AuthProvider } from './context/authContext';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/layout/Navbar';
import Head from 'next/head';
import PathName from './components/layout/PathName';
import { Toaster } from 'sonner';
import { useParams, usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Apotek Jayapan',
//   description: 'Website Apotek Online',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  const pathname = usePathname()


  return (
    <html lang="en">
      <body className='bg-slate-100'>
        <Toaster/>
        <AuthProvider>
          <Theme accentColor="teal" grayColor="sand" radius="full">
            <Navbar />
            <main className='flex gap-2'>
              <section className={`${pathname.includes('/login') && 'hidden'} 'p-4 w-[200px] bg-emerald-600 text-white flex flex-col gap-2 rounded-md relative left-4'`}>
                <Sidebar />
              </section>
              <section className="min-h-[90vh] flex justify-center mt-12 w-[90%]">
                <div className='absolute top-[65px] right-[20px]'>
                  <PathName />
                </div>
                {children}
              </section>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  )
}
