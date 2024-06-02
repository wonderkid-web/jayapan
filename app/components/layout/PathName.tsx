"use client"

import { usePathname } from "next/navigation"

const PathName = () => {
    const pathname = usePathname()
  return (
    <div>
        <h1 className={`${pathname.includes('/login') && 'hidden'}  "text-gray-900"`}>{pathname}</h1>
    </div>
  )
}

export default PathName