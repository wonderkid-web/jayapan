"use client"
import { Avatar, Button, DropdownMenu, Flex } from "@radix-ui/themes"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { FcExpand } from "react-icons/fc"


const Navbar = () => {
    const { push } = useRouter()

    const params = usePathname()

    return (
        <nav className={`${params.includes('/login') && 'hidden'} h-[50px] relative bg-emerald-500 text-white items-center justify-between flex p-2 w-[97%] rounded mx-auto m-2`}>
            <Image src={'/drugs.png'} width={35} height={15} alt="drugs icon" />
            <h1 className="font-bold text-2xl">Jayapan</h1>
            <Flex gap="2" p={'2'} align={"center"}>
                <Avatar
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                    fallback="A"
                />
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Button color="grass" variant="surface">
                            <FcExpand />
                        </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item onClick={() => {
                            localStorage.clear()
                            push('/login')
                        }}>Logout</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </Flex>
        </nav>
    )
}

export default Navbar