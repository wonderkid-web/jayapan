import Image from "next/image"


const Navbar = () => {
    return (
        <nav className="h-[50px] relative bg-emerald-500 text-white items-center flex p-2">
            <Image src={'/drugs.png'} width={35} height={15} alt="drugs icon" />
            <h1 className="font-bold">Jayapan</h1>
        </nav>
    )
}

export default Navbar