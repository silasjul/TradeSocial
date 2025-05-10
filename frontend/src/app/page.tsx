"use client";

import { AppSidebar } from "@/components/app-sidebar";
import PostCard from "@/components/post-card";
import QuoteCard from "@/components/quote-card";
import StockChart from "@/components/stock-chart";
import { useFAANG } from "@/hooks/use-api";
import { dummyPeople, dummyPosts } from "@/lib/dummy-data";

export default function Page() {
    const faangData = useFAANG(10000); // arg: Seconds between each fetch

    return (
        <>
            <AppSidebar activepage="Dashboard">
                <div className="flex-col mx-16 my-6">
                    <header>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Overview
                        </h1>
                        <p className="text-xl text-muted-foreground mt-1">
                            Stay informed with recent market data and expert
                            social commentary.
                        </p>
                    </header>
                    <section className="mt-8 flex gap-8">
                        <div className="flex flex-col">
                            <div>
                                <h3 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">
                                    Recent tweets
                                </h3>
                                <div className="flex flex-col gap-4 mb-4">
                                    {dummyPosts.map((p, idx) => (
                                        <PostCard
                                            key={idx}
                                            post={p}
                                            person={dummyPeople[1]}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h3 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">
                                    Chart
                                </h3>
                                <div className="border rounded-lg flex-grow">
                                    <StockChart
                                        symbol={"TSLA"}
                                        multiplier={1}
                                        timeSpan={"day"}
                                    />{" "}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">
                                Market data
                            </h3>
                            <div className="flex flex-col gap-4">
                                {faangData.map((q) => (
                                    <QuoteCard key={q.symbol} quote={q} />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </AppSidebar>
        </>
    );
}
