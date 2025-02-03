"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';
const Nav = () => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { data: session } = useSession();
    const searchRef = useRef<HTMLDivElement>(null);
    const userImage = session?.user?.image ?? "/default-profile.png";

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
     
    const pathName = usePathname()
    

    const navigationItemsForAspirant = useMemo(() => [
        {
            href: "/study-groups",
            label: "Study Groups",
            icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            href: "/challenges",
            label: "My Challenges",
            icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            href: "/following",
            label: "Following",
            icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            href: "/bookmarks",
            label: "Bookmarks",
            icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            )
        },
        {
            href: "/casual-chat",
            label: "Casual Chat",
            icon: (
                
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  className="h-5 w-5 lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                
            )
        },
        {
            href: "/feedback",
            label: "Try It",
            icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            href: "/about",
            label: "About",
            icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ],[]);

    const navigationItemsForMentors = useMemo(() => navigationItemsForAspirant.filter((item) =>
    item.href !== "/study-groups" &&
    item.href !== "/following" &&
    item.href !== "/bookmarks"
    ), [navigationItemsForAspirant]);
    const [navigationItems, setNavigationItems] = useState(navigationItemsForAspirant)

        
    useEffect(() => {
        if (pathName.startsWith("/home/mentor")) {
            setNavigationItems(navigationItemsForMentors);
        } else {
            setNavigationItems(navigationItemsForAspirant);
        }
    }, [pathName, navigationItemsForAspirant, navigationItemsForMentors]);



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
    <header className=" top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-[#300171] to-slate-900 border-b border-purple-500/20">
    <div className="px-4 py-2">
        <nav className="flex items-center h-16 ">
            {/* Left Section - Menu & Logo */}
            <div className="flex items-center">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white 
                        hover:bg-purple-500/20 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
                <Link href="/" className="ml-2  bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text py-4 text-center text-2xl font-bold text-transparent">
                    Mentoras
                </Link>
               
            </div>

            {/* Middle Section - Navigation */}
            <div className="ml-18 flex items-center gap-4 ">
            <div className="hidden lg:flex items-center gap-4 ml-20">
                {navigationItems.map((item) => (
                    <Link key={item.href} href={item.href}
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-all">
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
            </div>

            {/* Right Section - Search & Profile */}
            <div className="flex items-center gap-4 ml-auto">
                <div className="relative" ref={searchRef}>
                    {!isSearchOpen ? (
                        <button onClick={() => setIsSearchOpen(true)}
                            className="p-2 rounded-md text-gray-400 hover:text-white transition-all">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    ) : (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 sm:w-96
                            bg-black/50 backdrop-blur-sm border border-purple-500/20 
                            rounded-xl px-4 py-2 flex items-center gap-3">
                            <svg className="h-5 w-5 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" 
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" autoFocus
                                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                                placeholder="Search..." />
                            <button onClick={() => setIsSearchOpen(false)}
                                className="p-1 rounded-md text-gray-400 hover:text-white">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative z-50" ref={dropdownRef}>
                    {session ? (
                        <>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 p-1.5 rounded-xl border border-purple-500/20 
                                    hover:border-purple-500/40 transition-all">
                                <Image width={75} height={75}  src={userImage} alt="Profile" className="w-8 h-8 rounded-full" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 py-2 bg-black/50 backdrop-blur-sm 
                                    rounded-xl border border-purple-500/20 shadow-xl">
                                    <button onClick={() => router.push("/home/aspirant/profile")}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-300 
                                            hover:bg-purple-500/20">
                                        Profile
                                    </button>
                                    <button onClick={() => signOut()}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-300 
                                            hover:bg-purple-500/20">
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <button onClick={() => signIn("google", { callbackUrl: "/role" })}
                            className="px-4 py-2 rounded-xl bg-purple-600 text-white 
                                hover:bg-purple-700 transition-all">
                            Sign in
                        </button>
                    )}
                </div>
        
                {isSidebarOpen && (
    <>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={() => setIsSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-gray-900 via-[#300171] 
            to-slate-900 z-[70] border-r border-purple-500/20 transform transition-transform">
            <div className="p-5 space-y-6">
                <nav className="space-y-2">
                    {navigationItems.map((item) => (
                        <Link key={item.href} href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 
                                hover:bg-purple-500/20 hover:text-white">
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    </>
)}
            </div>
        </nav>
    </div>
</header>
        
    );
};

export default Nav;


