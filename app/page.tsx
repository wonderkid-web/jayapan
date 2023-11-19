"use client"

import { useAuthContext } from "./context/authContext"

export default function Home() {
  const {isLoggin} = useAuthContext()

  return (
    <main>
        <h1>TEST</h1>
    </main>
  )
}
