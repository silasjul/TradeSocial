import { getCompanyProfile } from "@/lib/stock-data/finnhub";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(requet: Request) {
    const { searchParams } = new URL(requet.url);

    const symbol = searchParams.get("symbol");

    const validation = z.string().min(1).safeParse(symbol);

    if (!validation.success) {
        console.error("Invalid symbol");
        return NextResponse.json(
            { error: "Invalid symbol requesting company profile" },
            { status: 400 }
        );
    }

    try {
        const companyProfile = await getCompanyProfile(validation.data);
        return NextResponse.json(companyProfile);
    } catch (err: any) {
        console.error("Error fetching company profile", err.message);
        return NextResponse.json(
            { error: "Error fetching company profile from finnhub" },
            { status: 500 }
        );
    }
}
