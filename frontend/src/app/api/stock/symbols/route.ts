import { getSymbols } from "@/lib/stock-data/finnhub";

export async function GET() {
    try {
        const symbolData = await getSymbols();
        return Response.json(symbolData);
    } catch (err: any) {
        console.error(err.message);
        return Response.json({
            error: "Failed getting symbols. Try again later.",
        });
    }
}
