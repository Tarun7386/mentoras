"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import StreakDisplay from "./aspirant/StreakDisplay";
const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const { data: session } = useSession();
  const searchRef = useRef<HTMLDivElement>(null);
  const userImage = session?.user?.image ?? "/default-profile.png";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathName = usePathname();

  const navigationItemsForAspirant = useMemo(
    () => [
      {
        href: "/role",
        label: "Home",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        ),
      },
      {
        href: "/study-groups",
        label: "Study Groups",
        icon: (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        ),
      },
      {
        href: "/challenges",
        label: "My Challenges",
        icon: (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        ),
      },
      {
        href: "/following",
        label: "Following",
        icon: (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ),
      },
      {
        href: "/home/aspirant/bookmarks",
        label: "Bookmarks",
        icon: (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        ),
      },
      {
        href: "/casual-chat",
        label: "Casual Chat",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            className="lucide lucide-message-circle h-5 w-5"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        ),
      },
      {
        href: "/feedback",
        label: "Try It",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
        ),
      },
      {
        href: "/about",
        label: "About",
        icon: (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
    ],
    [],
  );

  const navigationItemsForMentors = useMemo(
    () =>
      navigationItemsForAspirant.filter(
        (item) =>
          item.href !== "/study-groups" &&
          item.href !== "/following" &&
          item.href !== "/bookmarks",
      ),
    [navigationItemsForAspirant],
  );
  const [navigationItems, setNavigationItems] = useState(
    navigationItemsForAspirant,
  );

  useEffect(() => {
    if (pathName.startsWith("/home/mentor")) {
      setNavigationItems(navigationItemsForMentors);
    } else {
      setNavigationItems(navigationItemsForAspirant);
    }
  }, [pathName, navigationItemsForAspirant, navigationItemsForMentors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 

return (
    <header className="left-0 right-0 top-0 z-50 border-b border-purple-500/20 bg-gradient-to-r from-gray-900 via-[#300171] to-slate-900">
      <ToastContainer />
      <div className="px-4 ">
        <nav className="flex h-16 items-center justify-between">
          {/* Left Section - Menu & Logo */}
          <div className="flex items-center" >
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-md p-2 text-gray-400 hover:bg-purple-500/20 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isSidebarOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
          
          
            <div className="flex items-center justify-center gap-2 sm:gap-4 ">
             
              <button
                onClick={() => setIsStreakModalOpen(true)}
                className="group flex items-center gap-2 rounded-lg border-2 border-yellow-500/30 
    bg-gradient-to-r from-yellow-500/20 to-yellow-500/20 px-1 py-1.5 
    text-gray-200 transition-all duration-300 
    hover:border-yellow-500/50 hover:from-yellow-500/20 hover:to-purple-500/20 
    hover:text-white hover:shadow-lg hover:shadow-yellow-500/20 
    active:scale-95 sm:px-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:animate-spin-slow h-5 w-5 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                {/* streakbutton */}
                <StreakDisplay/>
              </button>
              <Link href="/role" className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-center text-xl font-bold text-transparent sm:text-2xl">
              Mentoras
            </Link>
             
              {/* Streak Modal */}
              {isStreakModalOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsStreakModalOpen(false)}
                  />
                  <div className="fixed left-1/2 top-1/2 z-[90] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-purple-500/20 bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 p-6 shadow-xl shadow-purple-500/10">
                    <div className="relative">
                      {/* Close button */}
                      <button
                        onClick={() => setIsStreakModalOpen(false)}
                        className="absolute -right-2 -top-2 rounded-lg p-2 text-gray-400 hover:bg-purple-500/20 hover:text-white"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>

                      {/* Modal content */}
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="mb-2 text-xl font-bold text-white">
                            Streak Rules
                          </h3>
                          <p className="text-gray-400">
                            Keep your streak going by following these rules:
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3 rounded-lg border border-purple-500/20 bg-purple-500/10 p-3">
                            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white">
                              1
                            </span>
                            <p className="text-gray-300">
                          Earn 2 streak points daily by completing tasks in the study group.
                            </p>
                          </div>

                          <div className="flex items-start gap-3 rounded-lg border border-purple-500/20 bg-purple-500/10 p-3">
                            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white">
                              2
                            </span>
                            <p className="text-gray-300">
                          Earn an extra streak point for completing more than one task in a day.
                            </p>
                          </div>

                          <div className="flex items-start gap-3 rounded-lg border border-purple-500/20 bg-purple-500/10 p-3">
                            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white">
                              3
                            </span>
                            <p className="text-gray-300">
                          Your streak will be reset to 0 if you miss a day.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
          {/* Right Section - Search & Profile */}
          <div className="flex items-center  sm:gap-2">
            <div className="relative" ref={searchRef}>
              {!isSearchOpen ? (
                // <button onClick={() => setIsSearchOpen(true)}
                <button
                  onClick={() => toast.info("Still working on this feature")}
                  className="rounded-md p-2 text-gray-400 transition-all hover:text-white"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              ) : (
                <div className="absolute right-0 top-1/2 flex w-72 -translate-y-1/2 items-center  rounded-xl border border-purple-500/20 bg-black/50 px-4 py-2 backdrop-blur-sm sm:w-96">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    autoFocus
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    placeholder="Search..."
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="rounded-md p-1 text-gray-400 hover:text-white"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="relative z-50" ref={dropdownRef}>
              {session ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center  rounded-xl p-1 
          sm:gap-1 sm:p-1.5 transition-all hover:border-purple-500/40"
                  >
                    <Image
                      width={32}
                      height={32}
                      src={userImage}
                      alt="Profile"
                      className="h-6 w-6 rounded-full sm:h-8 sm:w-8"
                    />
                  </button>
                  {/* {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 py-2 bg-black/50 backdrop-blur-sm 
                                    rounded-xl border border-purple-500/20 shadow-xl"> */}
                  {/* <button onClick={() => router.push("/home/aspirant/profile")}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-300 
                                            hover:bg-purple-500/20">
                                        Profile
                                    </button> */}
                  {/* <button onClick={() => signOut()}
                                        className="w-full px-4 py-2 text-left text-sm text-gray-300 
                                            hover:bg-purple-500/20">
                                        Sign out
                                    </button> */}
                  {/* </div>
                            )} */}
                </>
              ) : (
                <button
                onClick={() => void signIn("google", { callbackUrl: "/role" })}
                className="rounded-xl bg-gradient-to-r from-blue-700 to-blue-700
                  px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white 
                  transition-all hover:from-blue-700 hover:to-blue-800"
              >
                Sign in
              </button>
              )}
            </div>

            {isSidebarOpen && (
              <>
                <div
                  className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <div className="fixed inset-y-0 left-0 z-[70] w-72 transform border-r border-purple-500/20 bg-gradient-to-b from-gray-900 via-[#300171] to-slate-900 transition-transform">
                  {/* Add close button */}
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:bg-purple-500/20 hover:text-white"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <div className="mt-8 space-y-6 p-5">
                    <nav className="space-y-2">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 hover:bg-purple-500/20 hover:text-white"
                          onClick={() => setIsSidebarOpen(false)}
                        >
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
