'use client'
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function GetstartedButton() {

const { data: session } = useSession()
        
  return (
    <div className="container flex flex-col items-center justify-center px-4 ">

      <button
        onClick={() => {
          if (session) {
            redirect("/role");
          } else {
           void signIn("google", { callbackUrl: "/role" });
          }
        }}

        className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        Get started
        <svg
          className="w-6 h-6 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
          />
        </svg>
      </button>

    </div>

  );
}

export default GetstartedButton;