import Link from 'next/link';

type EditButtonProps = {
    id: string;
};

export default function EditButton({ id }: EditButtonProps) {
    return (
        <Link
            href={`/auctions/update/${id}`}
            className="
                px-4 py-2 rounded-md border-2 flex items-center justify-center gap-2
                bg-amber-500 text-white border-amber-500
                hover:bg-amber-600 transition-colors
            "
        >
            Update Auction
        </Link>
    );
}
