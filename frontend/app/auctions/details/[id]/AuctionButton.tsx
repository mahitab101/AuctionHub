"use client";

import { deleteAuction } from "@/app/actions/auctionactions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaEdit, FaSpinner } from "react-icons/fa";

type AuctionButtonProps = {
    id: string;
};

export default function AuctionButton({ id }: AuctionButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    function handleDelete() {
        const confirmed = confirm(
            "Are you sure you want to delete this auction? This action cannot be undone."
        );

        if (!confirmed) return;

        setLoading(true);
        deleteAuction(id).then(res => {
            if (res.error) throw res.error
            router.refresh();
            router.push("/")
        })
            .catch((error) => {
                toast.error(`${error.status} ${error.message}`);
            })
            .finally(() => setLoading(false));
    }

    return (
        <div className="flex gap-3">
            {/* Update */}
            <Link
                href={`/auctions/update/${id}`}
                className="
                    px-4 py-2 rounded-md border-2 flex items-center justify-center gap-2
                    bg-amber-500 text-white border-amber-500
                    hover:bg-amber-600 transition-colors
                "
            >
                <FaEdit />
                Update
            </Link>

            {/* Delete */}
            <button
                onClick={handleDelete}
                disabled={loading}
                className="
                    px-4 py-2 rounded-md border-2 flex items-center justify-center gap-2
                    bg-red-500 text-white border-red-500
                    hover:bg-red-600 transition-colors
                    disabled:bg-gray-300
                    disabled:border-gray-300
                    disabled:text-gray-600
                    disabled:cursor-not-allowed
                "
            >
                {loading ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                Delete
            </button>
        </div>
    );
}
