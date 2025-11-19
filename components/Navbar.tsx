'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const activeLink = usePathname();
    const navItems = [
        {
            href: '/',
            label: 'Home'
        },
        {
            href: '/companions',
            label: 'Learning Companions'
        },
        {
            href: '/my-journey',
            label: 'My Journey'
        }
    ]
return (
    <nav className="flex items-center justify-between w-full mx-auto py-4 px-15 bg-white shadow-sm">
        <div className="logo">
            <Link href="/" className="cursor-pointer">
                <Image src="/images/logo.svg" alt="Logo" width={50} height={50} />
            </Link>
        </div>
        <div className="nav-links flex gap-8 items-center">
            {navItems.map((item) => (
                <Link href={item.href} key={item.label} className={`${activeLink === item.href ? 'text-orange-500 font-semibold ' : 'text-black font-medium'}text-lg cursor-pointer`}>{item.label}</Link>
            ))}
        </div>
    </nav>
)
}
