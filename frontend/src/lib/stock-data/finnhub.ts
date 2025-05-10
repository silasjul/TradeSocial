import axios from "axios";
import { z } from "zod";

/*
Finnhub's free plan allows up to 60 api calls / minute

use api to get symbol, company information and realtime stock data
*/

const api_key = process.env.FINNHUB_API_KEY;
if (!api_key) {
    throw new Error(
        "FINNHUB_API_KEY is not defined in the environment variables."
    );
}

const finnhub = axios.create({
    baseURL: "https://www.finnhub.io/api/v1",
    params: {
        token: api_key,
    },
});

// --- getSymbols ---

const SymbolSchema = z.array(
    z.object({ description: z.string(), symbol: z.string() })
);

export type SymbolData = z.infer<typeof SymbolSchema>;

async function getSymbols(): Promise<SymbolData> {
    try {
        const response = await finnhub.get(`/stock/symbol`, {
            params: { exchange: "US" },
        });
        const validatedSymbols = SymbolSchema.parse(response.data);
        return validatedSymbols;
    } catch (error: any) {
        console.log(error.message);
        if (error instanceof z.ZodError) {
            throw new Error("Failed zod data parsing: Invalid data structure");
        } else if (axios.isAxiosError(error)) {
            throw new Error("Axios error: " + error.message);
        } else {
            throw new Error(`Failed fetching symbols: ${error.message}`);
        }
    }
}

interface SearchResult {
    result: Symbol[];
}

async function searchSymbols(search: string): Promise<SearchResult | null> {
    let result = null;
    try {
        const response = await finnhub.get(`/search`, {
            params: { q: search, exchange: "US" },
        });
        result = response.data as SearchResult;
    } catch (error) {
        console.error("Error fetching searchresult: ", error);
    }
    return result;
}

interface BasicFinancials {
    metric: {
        "52WeekHigh": number; // highest within a year
        "52WeekHighDate": string; // "year-mm-dd"
        "52WeekLow": number; // lowest within a year
        "52WeekLowDate": string; // "year-mm-dd"
        epsTTM: number; // Profit per share of stock. EPS = $5.0 means: The company earned $5.0 per share over the last 12 months.
        peTTM: number; // Price-to-Earnings (P/E) - for every dollar the company earns, investors are paying x dollars for a share of that stock. The higher the more investors are willing to pay.
        marketCapitalization: number; // M_Cap = price x shares
    };
}

async function getBasicFinancials(
    symbol: string
): Promise<BasicFinancials | null> {
    let result = null;
    try {
        const response = await finnhub.get(`/stock/metric`, {
            params: { symbol: symbol },
        });
        result = response.data as BasicFinancials;
        console.log("Basic financials: ", result);
    } catch (error) {
        console.error("Error fetching basic financials: ", error);
    }
    return result;
}

export interface CompanyProfile {
    country: string; // US
    currency: string; // USD
    exchange: string; // NASDAQ NMS
    finnhubIndustry: string; // Technology
    ipo: string; // yyyy-mm-dd (When shares was first offered to public)
    logo: string; // url to a png image
    name: string; // Apple Inc
}

async function getCompanyProfile(symbol: string): Promise<CompanyProfile> {
    let result = null;
    try {
        const response = await finnhub.get(`/stock/profile2`, {
            params: { symbol: symbol },
        });
        result = response.data as CompanyProfile;
        return result;
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            throw new Error(
                `Invalid data structure received from Polygon API for OHLC.`
            );
        } else if (axios.isAxiosError(error)) {
            throw new Error("Axios error fetching OHCL: " + error.message);
        } else {
            throw new Error(`Failed to fetch OHLC: ${error.message}`);
        }
    }
}

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

async function getQuote(symbol: string): Promise<Quote | null> {
    let result = null;
    try {
        const response = await finnhub.get(`/quote`, {
            params: { symbol: symbol },
        });
        result = response.data as Quote;
    } catch (error) {
        console.error("Error fetching quote: ", error);
    }
    return result;
}

export {
    getSymbols,
    getBasicFinancials,
    getCompanyProfile,
    getQuote,
    searchSymbols,
};
