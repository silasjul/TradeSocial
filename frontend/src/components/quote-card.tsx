import { FaangQuote, useCompanyProfile } from "@/hooks/use-api";
import { Dot } from "lucide-react";
import Image from "next/image";
import React from "react";

/* 
export interface Quote {
    c: number; // Current price
    d: number; // Change in price since last close
    dp: number; // d in percentage
    h: number; // highest price in current trading session
    l: number; // lowest
    o: number; // opening price
    pc: number; // previos close price
    t: number; // Unix timestamp
}
*/

export default function QuoteCard({ quote }: { quote: FaangQuote }) {
    const { data, isLoading, error } = useCompanyProfile(quote.symbol);

    const dpIsNegative = () => {
        return quote.data?.dp.toString()[0] == "-";
    };

    if (isLoading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error.</div>;
    } else
        return (
            <div className="border rounded-lg p-4">
                <header className="flex gap-2 items-center mb-2">
                    <Image
                        className="rounded-full"
                        width={20}
                        height={20}
                        src={data.logo}
                        alt={"logo"}
                    />
                    <p className="font-semibold text-sm flex items-center gap-1">
                        {data.name}
                    </p>
                    <p
                        className={`text-xs ${
                            dpIsNegative() ? "text-red-500" : "text-green-500"
                        }`}
                    >
                        {!dpIsNegative() && "+"}
                        {quote.data?.dp.toFixed(2)}%
                    </p>
                </header>
                <div>
                    <div className="flex items-center gap-1">
                        <p className="text-md font-bold">${quote.data?.c}</p>
                    </div>
                    <div className="text-xs opacity-80 mt-1 flex items-center">
                        <p>High ${quote.data?.h.toFixed(2)}</p>
                        <Dot />
                        <p>Low ${quote.data?.l.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        );
}
