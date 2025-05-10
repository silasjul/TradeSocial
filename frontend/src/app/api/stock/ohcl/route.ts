import { NextResponse } from "next/server";
import { z } from "zod";
import { getOHLC, timespans } from "@/lib/stock-data/polygon";

// --- Validation Schema ---
const QuerySchema = z.object({
    symbol: z.string().min(1, { message: "Stock symbol is required." }),
    multiplier: z.coerce
        .number()
        .int({ message: "Multiplier must be an integer." })
        .positive({ message: "Multiplier must be positive." }),
    timespan: z.enum(timespans, {
        errorMap: () => ({
            message: "Timespan must be one of: " + timespans.join(", "),
        }),
    }),
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // Extract parameters as an object for Zod validation
    const queryParams = {
        symbol: searchParams.get("symbol"),
        multiplier: searchParams.get("multiplier"),
        timespan: searchParams.get("timespan"),
    };

    const validationResult = QuerySchema.safeParse(queryParams);

    if (!validationResult.success) {
        console.error(
            "Query Parameter Validation Error:",
            validationResult.error
        );
        return NextResponse.json(
            { error: `Invalid input: ${validationResult.error}` },
            { status: 400 } // Bad Request
        );
    }

    const { symbol, multiplier, timespan } = validationResult.data;
    try {
        const ohlcData = await getOHLC(symbol, multiplier, timespan);
        return NextResponse.json(ohlcData);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch OHLC data. Please try again later." },
            { status: 500 } // Internal Server Error
        );
    }
}
