import React from 'react'

type CurrentBidProps = {
    amount?: number
    reservedPrice: number
}

export default function CurrentBid({ amount, reservedPrice }: CurrentBidProps) {
    const text = amount ? '$' + amount : 'No Bids';
    const color = amount
        ? amount > reservedPrice
            ? 'bg-green-600'
            : 'bg-amber-600'
        : 'bg-red-600'
    return (
        <div className={`${color} border-2 border-white text-white px-3 py-1 rounded-md flex justify-center`}>
            {text}
        </div>
    )
}
