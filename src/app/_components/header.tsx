"use client";

import { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react"; // Importing the useSession hook

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, status } = useSession(); // Use useSession hook to get session data

    // Default image if the user is not logged in or there's an issue
    const userImage = session?.user?.image || "/default-profile.png";

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);




    return (
        <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
            {/* Hamburger Button */}
            <button
                className="block lg:hidden p-2 rounded-md hover:bg-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <span className="sr-only">Open menu</span>
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>

            {/* Navigation Menu */}
            <nav
                className={`${isMenuOpen ? "block" : "hidden"
                    } absolute top-16 left-0 w-full bg-gray-800 lg:static lg:w-auto lg:block`}
            >
                <ul className="flex flex-col lg:flex-row lg:items-center">
                    <li className="lg:mx-4">
                        <a
                            href="/"
                            className="block px-4 py-2 lg:inline lg:p-0 hover:text-gray-400"
                        >
                            Home
                        </a>
                    </li>
                    <li className="lg:mx-4">
                        <a
                            href="/about"
                            className="block px-4 py-2 lg:inline lg:p-0 hover:text-gray-400"
                        >
                            About
                        </a>
                    </li>
                    <li className="lg:mx-4">
                        <a
                            href="#"
                            className="block px-4 py-2 lg:inline lg:p-0 hover:text-gray-400"
                        >
                            Services
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="text-xl font-bold cursor-pointer" 
            onClick={ ()=>{
                window.location.href = "/";
            }}>
                mentoras
            </div>

            {/* Profile Picture */}
            <div className="relative" ref={dropdownRef}>
                {session ? <img
                    src={userImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                /> : <button
                    onClick={() => signIn()}
                    className="block w-full px-4 py-2 text-left text-sm text-white-700 hover:bg-gray-100"
                >
                    Sign in
                </button>
 }
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-lg z-50">
                        <button
                            onClick={() => signOut()}
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
            

        </header>
    );
};

export default Header;
