import { getQuote } from "@/lib/stock-data/finnhub";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const symbol = searchParams.get("symbol");

    const validationResult = z.string().min(1).safeParse(symbol);

    if (!validationResult.success) {
        console.error("Error validating quote symbol param");
        return NextResponse.json(
            { error: "Error validating symbol: " + validationResult.error },
            { status: 400 }
        );
    }

    try {
        const quoteData = await getQuote(validationResult.data);
        return NextResponse.json(quoteData);
    } catch (err: any) {
        console.error("Error fetching quote data: " + err);
        return NextResponse.json(
            { error: "Failed to fetch quote data" },
            { status: 500 }
        );
    }
}
