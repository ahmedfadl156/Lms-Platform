'use client'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const activeLink = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <nav className="flex items-center justify-between w-full mx-auto py-4 px-6 md:px-15 bg-white shadow-sm relative">
            <div className="logo">
                <Link href="/" className="cursor-pointer">
                    <Image src="/images/logo.svg" alt="Logo" width={50} height={50} />
                </Link>
            </div>

            <button
                className="md:hidden flex flex-col gap-1.5 z-50"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            <div className="nav-links hidden md:flex gap-8 items-center">
                {navItems.map((item) => (
                    <Link href={item.href} key={item.label} className={`${activeLink === item.href ? 'text-orange-500 font-semibold ' : 'text-black font-medium'}text-lg cursor-pointer`}>{item.label}</Link>
                ))}
                <SignedOut>
                    <SignInButton>
                        <button className="btn-signin">Sign In</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>

            <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="flex flex-col gap-4 p-6">
                    {navItems.map((item) => (
                        <Link
                            href={item.href}
                            key={item.label}
                            className={`${activeLink === item.href ? 'text-orange-500 font-semibold' : 'text-black font-medium'} text-lg cursor-pointer py-2`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="pt-2 border-t border-gray-200">
                        <SignedOut>
                            <SignInButton>
                                <button className="btn-signin w-full">Sign In</button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    )
}
