import { Auction, AuctionFinished } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { numberWithCommas } from "../lib/numberWithCommas";

type AuctionFinishedToastProps = {
  auction: Auction;
  finishedAuction: AuctionFinished;
};

export default function AuctionFinishedToast({
  auction,
  finishedAuction,
}: AuctionFinishedToastProps) {
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
        <div className="flex flex-col">
          <span>
            Auction for {auction.make} {auction.model} has finished
          </span>
          {finishedAuction.itemSold && finishedAuction.amount ? (
            <p>
              Congrats to {finishedAuction.winner} who has won this auction for
              $${numberWithCommas(finishedAuction.amount)}
            </p>
          ) : (
            <p>this item did not sell</p>
          )}
        </div>
      </div>
    </Link>
  );
}
