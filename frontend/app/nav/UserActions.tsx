"use client"

import { User } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

type UserActionsProps = {
    user: User
}

export default function UserActions({ user }: UserActionsProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return (
        <div className="relative inline-block text-left" ref={ref}>
            {/* Toggle button */}
            <button
                onClick={() => setOpen((v) => !v)}
                className=""
            >
                Welcome {user.name} ▾
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="
                        absolute right-0 mt-2 w-48
                        rounded-md border border-gray-200
                        bg-white shadow-lg
                        z-50">
                    <button
                        type="button"
                        onClick={() => {
                            setOpen(false)
                            // TODO: navigate or open modal
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        My Auctions
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Auctions Won
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Sell My Car
                    </button>

                    {/* Only link */}
                    <Link
                        href="/session"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Session
                    </Link>
                    <hr />
                    <button
                        type="button"
                        onClick={() => {
                            signOut({ redirectTo: "/" })
                            setOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}
