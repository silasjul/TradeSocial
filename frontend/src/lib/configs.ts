import { TimeFrame } from "./interfaces";

/* Some global variables */

const defaultSymbols = [
    "AAPL",
    "TSLA",
    "NFLX",
    "NVDA",
    "AMZN",
    "META",
    "AMD",
    "MSFT",
    "GOOGL",
];

const faang = ["META", "AAPL", "AMZN", "NFLX", "GOOGL"];

const timeFrames: TimeFrame[] = [
    {
        name: "5",
        time: "minute",
        multiplier: 5,
    },
    {
        name: "10",
        time: "minute",
        multiplier: 10,
    },
    {
        name: "15",
        time: "minute",
        multiplier: 15,
    },
    {
        name: "1H",
        time: "hour",
        multiplier: 1,
    },
    {
        name: "4H",
        time: "hour",
        multiplier: 4,
    },
    {
        name: "D",
        time: "day",
        multiplier: 1,
    },
    {
        name: "W",
        time: "week",
        multiplier: 1,
    },
    {
        name: "M",
        time: "month",
        multiplier: 1,
    },
];

export { defaultSymbols, timeFrames, faang };
