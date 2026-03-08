import { Auction } from "@/types";
import Image from "next/image";
import Link from "next/link";

type AuctionCreatedToastProps = {
  auction: Auction;
};

export default function AuctionCreatedToast({
  auction,
}: AuctionCreatedToastProps) {
  return (
    <Link href={`/auctions/details/${auction.id}`}>
      <div className="flex flex-row items-center gap-2">
        <Image
          src={auction.imageUrl}
          height={80}
          width={80}
          alt="Image of Car"
          className="rounded-lg w-auto h-auto"
        />
        <span>
          New Auction! {auction.make} {auction.model} has been added
        </span>
      </div>
    </Link>
  );
}
