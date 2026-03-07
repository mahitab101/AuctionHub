"use client";

import { placeBidForAuction } from "@/app/actions/auctionactions";
import { numberWithCommas } from "@/app/lib/numberWithCommas";
import { useBidStore } from "@/hooks/useBidStore";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type BidFormProps = {
  auctionId: string;
  highBid: number;
};

export default function BidForm({ auctionId, highBid }: BidFormProps) {
  const { register, handleSubmit, reset } = useForm();
  const { addBid } = useBidStore();

  function onSubmit(data: FieldValues) {
    console.log({ data: { id: auctionId, amount: +data.amount } });
    placeBidForAuction(auctionId, +data.amount)
      .then((bid) => {
        if (bid.error) {
          reset();
          throw bid.error;
        }
        addBid(bid);
        reset();
      })
      .catch((err) => toast.error(err.message));
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center border-2 py-2 rounded-lg"
    >
      <input
        type="number"
        {...register("amount")}
        className="grow pl-5 bg-transparent focus:outline-none text-sm text-gray-600"
        placeholder={`Enter your bid (minimum bid is $${numberWithCommas(highBid + 1)})`}
      />
    </form>
  );
}
