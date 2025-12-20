"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button className="    
        border border-gray-500
        px-4 py-2
        rounded-md
        text-gray-700
        hover:bg-red-500 hover:text-white
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        onClick={() => signIn("id-server", { redirectTo: "/" }, { prompt: "login" })}
    >
      Sign in
    </button>
  );
}
