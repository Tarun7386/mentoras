"use client";

import { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    const userImage = session?.user?.image || "/default-profile.png";

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="flex items-center justify-between px-6 py-4 text-white ">
            {/* Logo */}
            <div
                className="text-xl font-bold cursor-pointer tex hover:text-purple-300 transition-all order-1"
                onClick={() => {
                    window.location.href = "/";
                }}
            >
                MENTORAS
            </div>

            {/* Hamburger Button */}
            <button
                className="block lg:hidden p-2 rounded-md hover:bg-gray-700 transition-all  lg:order-2"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            {/* Navigation Menu */}
            <nav
                className={`${isMenuOpen ? "block" : "hidden"
                    } absolute top-16 left-0 w-full lg:static lg:w-auto lg:flex`}
            >
                <ul className="flex flex-col lg:flex-row lg:items-center">
                    <li className="lg:mx-6">
                        <a
                            href="/studygroups"
                            className="inline-block px-4 py-2 lg:p-0 hover:text-purple-300 transition-all"
                        >
                            Study Groups
                        </a>
                    </li>
                    <li className="lg:mx-6">
                        <a
                            href="/mychallenge"
                            className="inline-block px-4 py-2 lg:p-0 hover:text-purple-300 transition-all"
                        >
                            My Challenges
                        </a>
                    </li>
                    <li className="lg:mx-6">
                        <a
                            href="/following"
                            className="inline-block px-4 py-2 lg:p-0 hover:text-purple-300 transition-all"
                        >
                            Following
                        </a>
                    </li>
                    
                    <li className="lg:mx-6">
                        <a
                            href="/mybookmarks"
                            className="inline-block px-4 py-2 lg:p-0 hover:text-purple-300 transition-all"
                        >
                            Bookmarks
                        </a>
                    </li>
                    <li className="lg:mx-6">
                        <a
                            href="/about"
                            className="inline-block px-4 py-2 lg:p-0 hover:text-purple-300 transition-all"
                        >
                            About
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Search Bar */}
            <div className="flex items-center justify-between w-full max-w-xs lg:max-w-md rounded-lg border border-purple-200/20 bg-purple-200/10 px-4 py-2 text-sm font-medium text-slate-800 transition-colors duration-300 dark:text-slate-100 hover:border-purple-200/50 hover:bg-purple-200/30">
                <div className="flex items-center gap-3">
                    <svg className="h-6 w-6 stroke-white" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                        type="text"
                        className="w-full bg-transparent text-sm text-white dark:text-slate-100 focus:outline-none"
                        placeholder="Search..."
                        aria-label="Search"
                    />
                </div>
                <span className="rounded-md border border-current px-1">
                    <span className="sr-only">Press </span>
                    <kbd>/</kbd>
                    <span className="sr-only"> to search</span>
                </span>
            </div>

            {/* Profile Picture */}
            <div className="relative" ref={dropdownRef}>
                {session ? (
                    <img
                        src={userImage}
                        alt="Profile"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                    />
                ) : (
                        <button onClick={() => signIn("google", { callbackUrl: "/role" })} className="block px-4 py-2 lg:inline lg:p-0 hover:text-purple-300">
                        Sign in
                    </button>
                )}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-lg z-50">
                        <button
                            onClick={() => router.push("/me")}
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Profile
                        </button>
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

export default Nav;
