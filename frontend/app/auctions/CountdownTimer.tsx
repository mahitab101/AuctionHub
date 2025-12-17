"use client";
import Countdown, { zeroPad } from "react-countdown";

interface CountdownRenderProps {
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
    days: number;
}
const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {

    return (
        <div className={`
        border-2 border-white text-white py-1 px-2 rounded-lg flex justify-center
        ${completed ? 'bg-red-600' : (days === 0 && hours < 10) ? 'bg-amber-600' : 'bg-green-600'}
        `}>
            {completed ? 
            (<span> Auction Finished</span>) : 
            (<span suppressHydrationWarning={true}>{days}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>)}
        </div>
    );
}
export default function CountdownTimer({ auctionEnd }: { auctionEnd: string }) {
    return (
        <div>
            <Countdown
                date={auctionEnd}
                renderer={renderer}
            />
        </div>
    )
}
