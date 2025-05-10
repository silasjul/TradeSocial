import { Timespan } from "./stock-data/polygon";

export interface TimeFrame {
    name: string;
    time: Timespan;
    multiplier: number;
}

export interface Person {
    name: string;
    username: string;
    img: string;
}

export interface Post {
    text: string;
    time: string;
    comments: number;
    retweets: number;
    likes: number;
    views: number;
}
