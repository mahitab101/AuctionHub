"use client";
import { getBidsForAuction } from "@/app/actions/auctionactions";
import Heading from "@/app/components/Heading";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, Bid } from "@/types";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BidItem from "./BidItem";

type BidListProps = {
  user: User | null | undefined;
  auction: Auction;
};

export default function BidList({ user, auction }: BidListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const { bids, setBids } = useBidStore();

  useEffect(() => {
    getBidsForAuction(auction.id)
      .then((res: any) => {
        if (res.error) {
          throw res.error;
        }
        setBids(res as Bid[]);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => setLoading(false));
  }, [auction.id, setBids]);

  if (loading) <span>Loading bids...</span>;
  return (
    <div className="border-2 rounded-lg p-2 bg-gray-100">
      <Heading title="Bids" />
      {bids.map((bid) => (
        <BidItem key={bid.id} bid={bid} />
      ))}
    </div>
  );
}
